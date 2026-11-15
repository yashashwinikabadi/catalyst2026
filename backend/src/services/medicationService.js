/**
 * Medication Management Service
 * Structured for clean local persistence with 1:1 schema readiness for Cloud Firestore.
 */
const fs = require('fs').promises;
const path = require('path');

const DATA_DIR = path.join(__dirname, '../../data');
const DATA_FILE = path.join(DATA_DIR, 'medications.json');

class MedicationService {
  constructor() {
    this.initialized = false;
  }

  async _ensureStorage() {
    try {
      await fs.mkdir(DATA_DIR, { recursive: true });
      try {
        await fs.access(DATA_FILE);
      } catch {
        // Initialize with clean empty list or default demonstration template
        await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2), 'utf8');
      }
      this.initialized = true;
    } catch (err) {
      console.error('[MedicationService] Error ensuring storage directory:', err);
      throw err;
    }
  }

  async _readData() {
    await this._ensureStorage();
    try {
      const content = await fs.readFile(DATA_FILE, 'utf8');
      return JSON.parse(content || '[]');
    } catch (err) {
      console.error('[MedicationService] Error reading medications file:', err);
      return [];
    }
  }

  async _writeData(data) {
    await this._ensureStorage();
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
  }

  /**
   * Helper to evaluate if a scheduled time has passed without action
   */
  _computeEffectiveStatus(med) {
    if (med.status === 'Taken' || med.status === 'Skipped') {
      return med.status;
    }

    if (med.remindLaterUntil) {
      const remindTime = new Date(med.remindLaterUntil).getTime();
      if (Date.now() < remindTime) {
        return 'Pending'; // Still in remind-later postponement
      }
    }

    // Check if scheduled time (e.g. "08:00 AM", "14:30") has passed today
    try {
      const now = new Date();
      const [timePart, meridiem] = (med.scheduledTime || '').trim().split(' ');
      if (timePart) {
        let [hours, minutes] = timePart.split(':').map(n => parseInt(n, 10));
        if (meridiem) {
          const upper = meridiem.toUpperCase();
          if (upper === 'PM' && hours < 12) hours += 12;
          if (upper === 'AM' && hours === 12) hours = 0;
        }

        const scheduledDate = new Date();
        scheduledDate.setHours(hours, minutes || 0, 0, 0);

        // If scheduled time was more than 90 minutes ago and still not taken/skipped: Unconfirmed
        const gracePeriodMs = 90 * 60 * 1000;
        if (now.getTime() > (scheduledDate.getTime() + gracePeriodMs)) {
          return 'Unconfirmed';
        }
      }
    } catch {
      // Fallback
    }

    return med.status || 'Pending';
  }

  async getAll() {
    const list = await this._readData();
    return list.map(med => ({
      ...med,
      status: this._computeEffectiveStatus(med)
    }));
  }

  async getById(id) {
    const list = await this.getAll();
    return list.find(m => m.id === id) || null;
  }

  async create({ medicineName, dosage, scheduledTime, instructions = '' }) {
    if (!medicineName || !dosage || !scheduledTime) {
      throw new Error('Medicine name, dosage, and scheduled time are required.');
    }

    const list = await this._readData();
    const nowIso = new Date().toISOString();

    const newMedication = {
      id: `med_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      medicineName: medicineName.trim(),
      dosage: dosage.trim(),
      scheduledTime: scheduledTime.trim(),
      instructions: (instructions || '').trim(),
      status: 'Pending',
      isCustomUserEntry: true,
      remindLaterUntil: null,
      createdAt: nowIso,
      updatedAt: nowIso,
      history: [
        {
          action: 'Created',
          timestamp: nowIso,
          recordedBy: 'User/Elder',
          notes: 'Medication entry created in schedule'
        }
      ]
    };

    list.push(newMedication);
    await this._writeData(list);
    return newMedication;
  }

  async recordAction(id, { action, notes = '', recordedBy = 'Elder' }) {
    const validActions = ['Taken', 'Skipped', 'RemindLater'];
    if (!validActions.includes(action)) {
      throw new Error(`Invalid action "${action}". Allowed: ${validActions.join(', ')}`);
    }

    const list = await this._readData();
    const index = list.findIndex(m => m.id === id);
    if (index === -1) {
      throw new Error(`Medication with id "${id}" not found.`);
    }

    const nowIso = new Date().toISOString();
    const med = list[index];

    let newStatus = med.status;
    let remindLaterUntil = med.remindLaterUntil;

    if (action === 'Taken') {
      newStatus = 'Taken';
      remindLaterUntil = null;
    } else if (action === 'Skipped') {
      newStatus = 'Skipped';
      remindLaterUntil = null;
    } else if (action === 'RemindLater') {
      newStatus = 'Pending';
      // Postpone by 15 minutes
      remindLaterUntil = new Date(Date.now() + 15 * 60 * 1000).toISOString();
    }

    med.status = newStatus;
    med.remindLaterUntil = remindLaterUntil;
    med.updatedAt = nowIso;
    med.history = med.history || [];
    med.history.push({
      action,
      timestamp: nowIso,
      recordedBy,
      notes: notes.trim()
    });

    list[index] = med;
    await this._writeData(list);
    return med;
  }
}

module.exports = new MedicationService();
