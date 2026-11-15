import React, { useState } from 'react';
import Card from '../common/Card';
import StatusBadge from '../common/StatusBadge';
import { useMedications, MED_STATUSES } from '../../context/MedicationContext';
import AddMedicationModal from './AddMedicationModal';

export default function MedicationTimeline({ isElder = false, showAddButton = true }) {
  const { medications, loading, error, addMedication, recordAction } = useMedications();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [actionFeedback, setActionFeedback] = useState(null);
  const [skipNoteId, setSkipNoteId] = useState(null);
  const [skipReason, setSkipReason] = useState('');

  const showNotification = (msg) => {
    setActionFeedback(msg);
    setTimeout(() => setActionFeedback(null), 5000);
  };

  const handleAction = async (id, action, notes = '') => {
    try {
      const res = await recordAction(id, action, {
        notes,
        recordedBy: isElder ? 'Elder' : 'Caregiver'
      });
      if (res.success) {
        if (action === 'Taken') {
          showNotification('Dose marked as Taken. Self-reported check-in recorded with exact timestamp.');
        } else if (action === 'Skipped') {
          showNotification('Dose marked as Skipped. Log updated with exact timestamp.');
        } else if (action === 'RemindLater') {
          showNotification('Reminder postponed by 15 minutes. Updated in timeline.');
        }
      }
    } catch (err) {
      showNotification(`Error: ${err.message}`);
    }
  };

  const formatTimestamp = (isoString) => {
    if (!isoString) return '';
    try {
      const d = new Date(isoString);
      return new Intl.DateTimeFormat('en-IN', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }).format(d);
    } catch {
      return isoString;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case MED_STATUSES.TAKEN:
        return <StatusBadge label="Taken" variant="success" />;
      case MED_STATUSES.SKIPPED:
        return <StatusBadge label="Skipped" variant="danger" />;
      case MED_STATUSES.UNCONFIRMED:
        return <StatusBadge label="Unconfirmed" variant="warning" />;
      case MED_STATUSES.PENDING:
      default:
        return <StatusBadge label="Pending" variant="sage" />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Toast Feedback */}
      {actionFeedback && (
        <div
          style={{
            backgroundColor: 'var(--color-forest)',
            color: '#E9E4D8',
            padding: '1rem 1.5rem',
            borderRadius: '14px',
            fontSize: isElder ? '1.15rem' : '0.95rem',
            fontWeight: 600,
            boxShadow: 'var(--shadow-md)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
          role="status"
        >
          <span>ℹ️ {actionFeedback}</span>
          <button
            type="button"
            onClick={() => setActionFeedback(null)}
            style={{ color: '#E9E4D8', fontWeight: 800, fontSize: '1.25rem', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Timeline Card */}
      <Card
        isElder={isElder}
        title="Active Medication Schedule"
        subtitle="Live daily timeline — tracks scheduled doses, user actions, and exact timestamps"
        headerAction={
          showAddButton && (
            <button
              type="button"
              onClick={() => setIsAddOpen(true)}
              style={{
                backgroundColor: 'var(--color-forest)',
                color: '#E9E4D8',
                padding: isElder ? '0.75rem 1.25rem' : '0.5rem 1rem',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: isElder ? '1.1rem' : '0.9rem',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <span>+ Add Medication</span>
            </button>
          )
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '0.75rem' }}>
          
          {/* Important Medical Truthfulness Disclosure */}
          <div
            style={{
              backgroundColor: 'rgba(233, 228, 216, 0.5)',
              border: '1.5px solid var(--color-border)',
              borderRadius: '12px',
              padding: '0.85rem 1.25rem',
              fontSize: '0.85rem',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.5
            }}
          >
            ⚖️ <strong>Medical Disclosure:</strong> A self-reported button press or reminder records that the action was logged by the user, but does not provide clinical verification that medicine was ingested. Consult a licensed physician for dosage changes.
          </div>

          {loading && medications.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
              Loading scheduled medications...
            </div>
          ) : medications.length === 0 ? (
            <div
              style={{
                padding: '2.5rem 1.5rem',
                textAlign: 'center',
                backgroundColor: 'var(--color-ivory-light)',
                borderRadius: '16px',
                border: '2px dashed var(--color-border)'
              }}
            >
              <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.5rem' }}>💊</span>
              <h4 style={{ fontSize: '1.25rem', color: 'var(--color-forest)', fontWeight: 700 }}>
                No active medications in your schedule yet
              </h4>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', margin: '0.5rem 0 1.25rem 0' }}>
                Add your doctor-prescribed medications to track doses, log actions, and keep your care circle synchronized.
              </p>
              {showAddButton && (
                <button
                  type="button"
                  onClick={() => setIsAddOpen(true)}
                  style={{
                    backgroundColor: 'var(--color-forest)',
                    color: '#E9E4D8',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '12px',
                    fontWeight: 700,
                    fontSize: '1rem',
                    cursor: 'pointer'
                  }}
                >
                  + Add Your First Medication
                </button>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {medications.map((med) => {
                const isTaken = med.status === MED_STATUSES.TAKEN;
                const isSkipped = med.status === MED_STATUSES.SKIPPED;
                const isUnconfirmed = med.status === MED_STATUSES.UNCONFIRMED;

                // Find latest action timestamp if logged
                const latestAction = (med.history || [])
                  .filter(h => h.action === 'Taken' || h.action === 'Skipped')
                  .slice(-1)[0];

                return (
                  <div
                    key={med.id}
                    style={{
                      backgroundColor: isTaken
                        ? 'rgba(169, 189, 169, 0.2)'
                        : isSkipped
                        ? 'rgba(192, 57, 43, 0.05)'
                        : isUnconfirmed
                        ? 'rgba(217, 119, 6, 0.06)'
                        : '#ffffff',
                      border: `2px solid ${
                        isTaken
                          ? 'var(--color-sage-dark)'
                          : isSkipped
                          ? 'var(--color-danger)'
                          : isUnconfirmed
                          ? 'var(--color-warning)'
                          : 'var(--color-border)'
                      }`,
                      borderRadius: isElder ? '22px' : '16px',
                      padding: isElder ? '1.5rem' : '1.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1rem',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  >
                    {/* Top Row: Time, Name, Dosage & Status Badge */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                        <span
                          style={{
                            backgroundColor: 'var(--color-forest)',
                            color: '#E9E4D8',
                            padding: isElder ? '0.4rem 0.85rem' : '0.3rem 0.65rem',
                            borderRadius: '8px',
                            fontSize: isElder ? '1.15rem' : '0.9rem',
                            fontWeight: 700,
                            flexShrink: 0
                          }}
                        >
                          {med.scheduledTime}
                        </span>

                        <div>
                          <h4
                            style={{
                              fontSize: isElder ? '1.5rem' : '1.15rem',
                              fontWeight: 800,
                              color: 'var(--color-forest)',
                              textDecoration: isTaken ? 'line-through' : 'none'
                            }}
                          >
                            {med.medicineName}
                          </h4>
                          <span style={{ fontSize: isElder ? '1.1rem' : '0.9rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
                            Dosage: {med.dosage}
                          </span>
                          {med.instructions && (
                            <p style={{ fontSize: isElder ? '1.05rem' : '0.85rem', color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>
                              📝 {med.instructions}
                            </p>
                          )}
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        {getStatusBadge(med.status)}
                        {latestAction && (
                          <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                            {latestAction.action} at {formatTimestamp(latestAction.timestamp)}
                          </span>
                        )}
                        {med.remindLaterUntil && (
                          <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-warning)', marginTop: '0.25rem', fontWeight: 700 }}>
                            ⏰ Snoozed until {formatTimestamp(med.remindLaterUntil)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons Row */}
                    <div
                      style={{
                        display: 'flex',
                        gap: isElder ? '1rem' : '0.75rem',
                        flexWrap: 'wrap',
                        borderTop: '1px solid var(--color-border)',
                        paddingTop: '0.85rem'
                      }}
                    >
                      {/* Taken Action */}
                      <button
                        type="button"
                        onClick={() => handleAction(med.id, 'Taken')}
                        style={{
                          flex: 1,
                          minWidth: isElder ? '140px' : '100px',
                          padding: isElder ? '1rem 1.5rem' : '0.65rem 1rem',
                          borderRadius: '12px',
                          border: isTaken ? '2px solid #2e7d32' : '1.5px solid var(--color-sage-dark)',
                          backgroundColor: isTaken ? '#2e7d32' : '#ffffff',
                          color: isTaken ? '#ffffff' : '#2e7d32',
                          fontWeight: 700,
                          fontSize: isElder ? '1.25rem' : '0.95rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.4rem'
                        }}
                      >
                        ✓ {isTaken ? 'Recorded Taken' : 'Mark Taken'}
                      </button>

                      {/* Skipped Action */}
                      <button
                        type="button"
                        onClick={() => setSkipNoteId(skipNoteId === med.id ? null : med.id)}
                        style={{
                          flex: 1,
                          minWidth: isElder ? '130px' : '90px',
                          padding: isElder ? '1rem 1.5rem' : '0.65rem 1rem',
                          borderRadius: '12px',
                          border: isSkipped ? '2px solid var(--color-danger)' : '1.5px solid var(--color-border)',
                          backgroundColor: isSkipped ? 'var(--color-danger)' : '#ffffff',
                          color: isSkipped ? '#ffffff' : 'var(--color-danger)',
                          fontWeight: 700,
                          fontSize: isElder ? '1.25rem' : '0.95rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.4rem'
                        }}
                      >
                        ✕ {isSkipped ? 'Recorded Skipped' : 'Skip Dose'}
                      </button>

                      {/* Remind Later Action */}
                      <button
                        type="button"
                        onClick={() => handleAction(med.id, 'RemindLater')}
                        style={{
                          flex: 1,
                          minWidth: isElder ? '160px' : '120px',
                          padding: isElder ? '1rem 1.5rem' : '0.65rem 1rem',
                          borderRadius: '12px',
                          border: '1.5px solid var(--color-champagne-dark)',
                          backgroundColor: '#ffffff',
                          color: 'var(--color-forest-dark)',
                          fontWeight: 700,
                          fontSize: isElder ? '1.25rem' : '0.95rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.4rem'
                        }}
                      >
                        ⏰ Remind Me Later (15m)
                      </button>
                    </div>

                    {/* Optional Skip Reason Expandable */}
                    {skipNoteId === med.id && (
                      <div
                        style={{
                          backgroundColor: 'var(--color-ivory-light)',
                          padding: '0.85rem 1rem',
                          borderRadius: '12px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.5rem'
                        }}
                      >
                        <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-forest)' }}>
                          Reason for skipping (Optional):
                        </label>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <input
                            type="text"
                            placeholder="e.g. Mild nausea, doctor advised hold, out of stock"
                            value={skipReason}
                            onChange={(e) => setSkipReason(e.target.value)}
                            style={{
                              flex: 1,
                              padding: '0.65rem 0.85rem',
                              borderRadius: '8px',
                              border: '1px solid var(--color-border)',
                              fontSize: '0.9rem'
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              handleAction(med.id, 'Skipped', skipReason);
                              setSkipNoteId(null);
                              setSkipReason('');
                            }}
                            style={{
                              backgroundColor: 'var(--color-danger)',
                              color: '#ffffff',
                              padding: '0.65rem 1.25rem',
                              borderRadius: '8px',
                              border: 'none',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            Confirm Skip
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Card>

      {/* Add Medication Modal */}
      <AddMedicationModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdd={addMedication}
      />
    </div>
  );
}
