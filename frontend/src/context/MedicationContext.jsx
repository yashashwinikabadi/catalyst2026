import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const MedicationContext = createContext();

export const MED_STATUSES = {
  PENDING: 'Pending',
  TAKEN: 'Taken',
  SKIPPED: 'Skipped',
  UNCONFIRMED: 'Unconfirmed'
};

export function MedicationProvider({ children }) {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getApiBase = () => {
    return (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
  };

  const fetchMedications = useCallback(async () => {
    try {
      setLoading(true);
      const apiBase = getApiBase();
      const url = apiBase ? `${apiBase}/api/medications` : '/api/medications';
      const response = await fetch(url);
      
      if (response.ok) {
        const json = await response.json();
        setMedications(json.data || []);
        setError(null);
        // Cache in localStorage for resilience
        try {
          localStorage.setItem('saanidhya_medications_cache', JSON.stringify(json.data || []));
        } catch {
          // Ignore storage quota
        }
      } else {
        throw new Error(`Failed to fetch medications: HTTP ${response.status}`);
      }
    } catch (err) {
      console.warn('[MedicationContext] API fetch error, falling back to cache:', err.message);
      setError(err.message);
      try {
        const cached = localStorage.getItem('saanidhya_medications_cache');
        if (cached) {
          setMedications(JSON.parse(cached));
        }
      } catch {
        // Fallback
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMedications();
    // Poll every 15 seconds to ensure Elder Mode and Caregiver Mode stay synchronized
    const interval = setInterval(fetchMedications, 15000);
    return () => clearInterval(interval);
  }, [fetchMedications]);

  const addMedication = async ({ medicineName, dosage, scheduledTime, instructions = '' }) => {
    try {
      const apiBase = getApiBase();
      const url = apiBase ? `${apiBase}/api/medications` : '/api/medications';
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ medicineName, dosage, scheduledTime, instructions })
      });

      if (!response.ok) {
        const errJson = await response.json();
        throw new Error(errJson.error?.message || 'Could not add medication');
      }

      const json = await response.json();
      await fetchMedications();
      return { success: true, data: json.data };
    } catch (err) {
      console.error('[MedicationContext] addMedication error:', err);
      // Fallback local persistence if network failed
      const nowIso = new Date().toISOString();
      const fallbackMed = {
        id: `med_local_${Date.now()}`,
        medicineName,
        dosage,
        scheduledTime,
        instructions,
        status: MED_STATUSES.PENDING,
        isCustomUserEntry: true,
        remindLaterUntil: null,
        createdAt: nowIso,
        updatedAt: nowIso,
        history: [{ action: 'Created', timestamp: nowIso, recordedBy: 'User/Elder', notes: 'Created offline' }]
      };
      const updatedList = [...medications, fallbackMed];
      setMedications(updatedList);
      try {
        localStorage.setItem('saanidhya_medications_cache', JSON.stringify(updatedList));
      } catch {}
      return { success: true, data: fallbackMed, offline: true };
    }
  };

  const recordAction = async (id, action, { notes = '', recordedBy = 'Elder' } = {}) => {
    try {
      const apiBase = getApiBase();
      const url = apiBase ? `${apiBase}/api/medications/${id}/action` : `/api/medications/${id}/action`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, notes, recordedBy })
      });

      if (!response.ok) {
        const errJson = await response.json();
        throw new Error(errJson.error?.message || 'Failed to record medication action');
      }

      await fetchMedications();
      return { success: true };
    } catch (err) {
      console.error('[MedicationContext] recordAction error:', err);
      // Fallback local update
      const nowIso = new Date().toISOString();
      setMedications(prev =>
        prev.map(m => {
          if (m.id === id) {
            let newStatus = m.status;
            let remindLaterUntil = m.remindLaterUntil;
            if (action === 'Taken') {
              newStatus = MED_STATUSES.TAKEN;
              remindLaterUntil = null;
            } else if (action === 'Skipped') {
              newStatus = MED_STATUSES.SKIPPED;
              remindLaterUntil = null;
            } else if (action === 'RemindLater') {
              newStatus = MED_STATUSES.PENDING;
              remindLaterUntil = new Date(Date.now() + 15 * 60 * 1000).toISOString();
            }
            const updatedHistory = m.history || [];
            updatedHistory.push({ action, timestamp: nowIso, recordedBy, notes });
            return { ...m, status: newStatus, remindLaterUntil, updatedAt: nowIso, history: updatedHistory };
          }
          return m;
        })
      );
      return { success: true, offline: true };
    }
  };

  return (
    <MedicationContext.Provider
      value={{
        medications,
        loading,
        error,
        fetchMedications,
        addMedication,
        recordAction
      }}
    >
      {children}
    </MedicationContext.Provider>
  );
}

export function useMedications() {
  const context = useContext(MedicationContext);
  if (!context) {
    throw new Error('useMedications must be used within a MedicationProvider');
  }
  return context;
}
