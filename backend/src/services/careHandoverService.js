
const fs = require('fs').promises;
const path = require('path');

const DATA_DIR = path.join(__dirname, '../../data');
const DATA_FILE = path.join(DATA_DIR, 'care-handovers.json');

class CareHandoverService {
  async readData() {
    await fs.mkdir(DATA_DIR, { recursive: true });

    try {
      const content = await fs.readFile(DATA_FILE, 'utf8');
      return JSON.parse(content || '[]');
    } catch (error) {
      if (error.code === 'ENOENT') {
        await fs.writeFile(DATA_FILE, '[]', 'utf8');
        return [];
      }
      throw error;
    }
  }

  async getAll() {
    return this.readData();
  }

  async create({ fromCaregiver, toCaregiver, summary, pendingTasks = '' }) {
    if (!fromCaregiver?.trim() || !toCaregiver?.trim() || !summary?.trim()) {
      throw new Error('Outgoing caregiver, incoming caregiver and summary are required.');
    }

    const handovers = await this.readData();

    const now = new Date().toISOString();

    const record = {
      id: `handover_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      fromCaregiver: fromCaregiver.trim(),
      toCaregiver: toCaregiver.trim(),
      summary: summary.trim(),
      pendingTasks: pendingTasks.trim(),
      createdAt: now,
      status: 'Awaiting Acknowledgement',
      acknowledgedAt: null,
      acknowledgedBy: null
    };

    handovers.push(record);
    await fs.writeFile(DATA_FILE, JSON.stringify(handovers, null, 2), 'utf8');

    return record;
  }

  async acknowledge(id, acknowledgedBy) {
    if (!acknowledgedBy?.trim()) {
      throw new Error('Acknowledging caregiver name is required.');
    }

    const handovers = await this.readData();
    const index = handovers.findIndex(item => item.id === id);

    if (index === -1) {
      throw new Error('Care handover not found.');
    }

    const record = handovers[index];

    if (record.status === 'Acknowledged') {
      throw new Error('This handover has already been acknowledged.');
    }

    record.status = 'Acknowledged';
    record.acknowledgedBy = acknowledgedBy.trim();
    record.acknowledgedAt = new Date().toISOString();

    await fs.writeFile(DATA_FILE, JSON.stringify(handovers, null, 2), 'utf8');

    return record;
  }
}

module.exports = new CareHandoverService();
