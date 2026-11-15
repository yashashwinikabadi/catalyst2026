import React, { useState } from 'react';

export default function AddMedicationModal({ isOpen, onClose, onAdd }) {
  const [medicineName, setMedicineName] = useState('');
  const [dosage, setDosage] = useState('');
  const [scheduledTime, setScheduledTime] = useState('08:00 AM');
  const [instructions, setInstructions] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!medicineName.trim()) {
      setFormError('Please enter the medicine name.');
      return;
    }
    if (!dosage.trim()) {
      setFormError('Please enter the dosage specified by your clinician.');
      return;
    }
    if (!scheduledTime.trim()) {
      setFormError('Please select a scheduled time.');
      return;
    }

    try {
      setSubmitting(true);
      await onAdd({
        medicineName: medicineName.trim(),
        dosage: dosage.trim(),
        scheduledTime: scheduledTime.trim(),
        instructions: instructions.trim()
      });
      // Reset form
      setMedicineName('');
      setDosage('');
      setScheduledTime('08:00 AM');
      setInstructions('');
      onClose();
    } catch (err) {
      setFormError(err.message || 'Could not save medication.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(23, 60, 56, 0.7)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '1.25rem'
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-med-title"
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          maxWidth: '560px',
          width: '100%',
          padding: '2.25rem',
          boxShadow: 'var(--shadow-lg)',
          border: '2px solid var(--color-border)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 id="add-med-title" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-forest)' }}>
              Add Daily Medication
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', marginTop: '0.2rem' }}>
              Enter medication details based on clinician guidance.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              fontSize: '1.5rem',
              color: 'var(--color-text-muted)',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              padding: '0.5rem'
            }}
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>

        {formError && (
          <div
            style={{
              backgroundColor: 'var(--color-danger-light)',
              color: 'var(--color-danger)',
              padding: '0.75rem 1rem',
              borderRadius: '10px',
              fontSize: '0.9rem',
              fontWeight: 600
            }}
          >
            ⚠️ {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label
              htmlFor="med-name"
              style={{ display: 'block', fontSize: '1rem', fontWeight: 700, color: 'var(--color-forest)', marginBottom: '0.4rem' }}
            >
              Medicine Name *
            </label>
            <input
              id="med-name"
              type="text"
              placeholder="e.g. Amlodipine, Metformin, Vitamin B12"
              value={medicineName}
              onChange={(e) => setMedicineName(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.9rem 1.15rem',
                borderRadius: '12px',
                border: '2px solid var(--color-border)',
                fontSize: '1.1rem',
                fontFamily: 'inherit',
                color: 'var(--color-forest)',
                backgroundColor: 'var(--color-ivory-light)'
              }}
            />
          </div>

          <div>
            <label
              htmlFor="med-dosage"
              style={{ display: 'block', fontSize: '1rem', fontWeight: 700, color: 'var(--color-forest)', marginBottom: '0.4rem' }}
            >
              Dosage (based on clinician instructions) *
            </label>
            <input
              id="med-dosage"
              type="text"
              placeholder="e.g. 5mg tablet, 1 capsule, 500mg"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.9rem 1.15rem',
                borderRadius: '12px',
                border: '2px solid var(--color-border)',
                fontSize: '1.1rem',
                fontFamily: 'inherit',
                color: 'var(--color-forest)',
                backgroundColor: 'var(--color-ivory-light)'
              }}
            />
            <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', display: 'block', marginTop: '0.3rem' }}>
              Note: Always enter the exact strength instructed on your prescription bottle.
            </span>
          </div>

          <div>
            <label
              htmlFor="med-time"
              style={{ display: 'block', fontSize: '1rem', fontWeight: 700, color: 'var(--color-forest)', marginBottom: '0.4rem' }}
            >
              Scheduled Time *
            </label>
            <select
              id="med-time"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              style={{
                width: '100%',
                padding: '0.9rem 1.15rem',
                borderRadius: '12px',
                border: '2px solid var(--color-border)',
                fontSize: '1.1rem',
                fontFamily: 'inherit',
                color: 'var(--color-forest)',
                backgroundColor: 'var(--color-ivory-light)',
                cursor: 'pointer'
              }}
            >
              <option value="06:00 AM">06:00 AM (Early Morning)</option>
              <option value="08:00 AM">08:00 AM (Morning with Breakfast)</option>
              <option value="10:00 AM">10:00 AM (Mid-Morning)</option>
              <option value="01:30 PM">01:30 PM (Afternoon Lunch)</option>
              <option value="05:00 PM">05:00 PM (Tea / Evening)</option>
              <option value="08:00 PM">08:00 PM (Dinner Routine)</option>
              <option value="10:00 PM">10:00 PM (Bedtime)</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="med-instructions"
              style={{ display: 'block', fontSize: '1rem', fontWeight: 700, color: 'var(--color-forest)', marginBottom: '0.4rem' }}
            >
              Optional Instructions
            </label>
            <input
              id="med-instructions"
              type="text"
              placeholder="e.g. Take with warm water after food, do not crush"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              style={{
                width: '100%',
                padding: '0.85rem 1.15rem',
                borderRadius: '12px',
                border: '2px solid var(--color-border)',
                fontSize: '1rem',
                fontFamily: 'inherit',
                color: 'var(--color-forest)',
                backgroundColor: 'var(--color-ivory-light)'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              style={{
                padding: '0.85rem 1.5rem',
                borderRadius: '12px',
                border: '1.5px solid var(--color-border)',
                backgroundColor: 'transparent',
                color: 'var(--color-forest)',
                fontWeight: 600,
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              style={{
                padding: '0.85rem 1.75rem',
                borderRadius: '12px',
                border: 'none',
                backgroundColor: 'var(--color-forest)',
                color: '#E9E4D8',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: submitting ? 'not-allowed' : 'pointer',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              {submitting ? 'Saving...' : 'Add to Schedule'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
