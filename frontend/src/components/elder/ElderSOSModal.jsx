import React, { useState } from 'react';

export default function ElderSOSModal({ isOpen, onClose }) {
  const [isSimulated, setIsSimulated] = useState(false);

  if (!isOpen) return null;

  const handleSimulateClick = () => {
    setIsSimulated(true);
  };

  const handleClose = () => {
    setIsSimulated(false);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 40, 37, 0.75)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '1.5rem'
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="sos-modal-title"
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '28px',
          maxWidth: '580px',
          width: '100%',
          padding: '2.5rem',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
          border: '4px solid #c0392b',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}
      >
        {/* Mandatory Safety Notice Banner */}
        <div
          style={{
            backgroundColor: '#fde8e7',
            border: '2px solid #c0392b',
            borderRadius: '14px',
            padding: '1rem',
            color: '#922b21',
            fontSize: '1rem',
            fontWeight: 700,
            lineHeight: 1.4
          }}
        >
          ⚠️ SAFETY NOTICE: This prototype does not contact emergency services or caregivers. In an actual emergency in India, call 112 directly.
        </div>

        {!isSimulated ? (
          <>
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                backgroundColor: '#fde8e7',
                color: '#c0392b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.25rem',
                margin: '0 auto'
              }}
            >
              🚨
            </div>

            <div>
              <span
                style={{
                  display: 'inline-block',
                  backgroundColor: 'rgba(192, 57, 43, 0.1)',
                  color: '#c0392b',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '999px',
                  marginBottom: '0.5rem'
                }}
              >
                Prototype Simulation Only
              </span>
              <h2
                id="sos-modal-title"
                style={{
                  fontSize: '1.75rem',
                  fontWeight: 800,
                  color: '#c0392b',
                  marginBottom: '0.5rem'
                }}
              >
                Emergency SOS Interface
              </h2>
              <p style={{ fontSize: '1.15rem', color: '#173C38', lineHeight: 1.5 }}>
                In production, pressing this button triggers immediate SMS, push notifications, and telephony alerts to configured family members.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <button
                type="button"
                onClick={handleSimulateClick}
                style={{
                  backgroundColor: '#c0392b',
                  color: '#ffffff',
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  padding: '1.15rem',
                  borderRadius: '16px',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(192, 57, 43, 0.3)',
                  cursor: 'pointer'
                }}
              >
                Test SOS Button (Prototype Demo)
              </button>
              <button
                type="button"
                onClick={handleClose}
                style={{
                  backgroundColor: '#E9E4D8',
                  color: '#173C38',
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  padding: '0.9rem',
                  borderRadius: '16px',
                  border: '2px solid rgba(23, 60, 56, 0.2)',
                  cursor: 'pointer'
                }}
              >
                Close Window
              </button>
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                backgroundColor: '#fef3c7',
                color: '#d97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.25rem',
                margin: '0 auto'
              }}
            >
              ℹ️
            </div>

            <div>
              <span
                style={{
                  display: 'inline-block',
                  backgroundColor: '#fef3c7',
                  color: '#92400e',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '999px',
                  marginBottom: '0.5rem'
                }}
              >
                Local Simulation Completed
              </span>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-forest)', marginBottom: '0.5rem' }}>
                Simulated Event Logged
              </h2>
              <p style={{ fontSize: '1.1rem', color: '#173C38', lineHeight: 1.5 }}>
                Local UI trigger tested successfully. <strong>No real dispatch occurred</strong> because an external telephony/SMS provider is not configured.
              </p>
            </div>

            <button
              type="button"
              onClick={handleClose}
              style={{
                backgroundColor: 'var(--color-forest)',
                color: '#E9E4D8',
                fontSize: '1.15rem',
                fontWeight: 700,
                padding: '1rem 2rem',
                borderRadius: '16px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Return to Dashboard
            </button>
          </>
        )}
      </div>
    </div>
  );
}
