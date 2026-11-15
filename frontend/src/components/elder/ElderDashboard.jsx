import React, { useState } from 'react';
import Card from '../common/Card';
import StatusBadge from '../common/StatusBadge';
import ElderSOSModal from './ElderSOSModal';
import MedicationTimeline from '../medication/MedicationTimeline';

export default function ElderDashboard() {
  const [isSOSOpen, setIsSOSOpen] = useState(false);
  const [checkedIn, setCheckedIn] = useState(false);
  const [prototypeNotice, setPrototypeNotice] = useState(null);
  const [selectedInstruction, setSelectedInstruction] = useState(null);
  const [showDemoReference, setShowDemoReference] = useState(false);
  const [helpRequestLoading, setHelpRequestLoading] = useState(false);
  const requestAssistance = async () => {
  if (helpRequestLoading) return;

  setHelpRequestLoading(true);

  try {
    const response = await fetch('/api/help-requests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        requestedBy: 'Shanti Devi (Sample Persona)',
        message: 'Assistance requested from Elder Mode.',
        urgency: 'High'
      })
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Could not record the request.');
    }

    setPrototypeNotice(
      'Assistance request recorded for the caregiver dashboard. No real emergency alert is sent.'
    );
  } catch (error) {
    setPrototypeNotice(error.message || 'Unable to record your request.');
  } finally {
    setHelpRequestLoading(false);
  }
};
  // Reference demo sample medications (preserved as requested)
  const [sampleDemoMeds, setSampleDemoMeds] = useState([
    { id: 1, name: 'Morning Blood Pressure (Telmisartan 40mg - Sample)', time: '8:00 AM', taken: true },
    { id: 2, name: 'Afternoon Calcium & Vitamin D3 (Sample)', time: '1:30 PM', taken: false },
    { id: 3, name: 'Evening Heart Care tablet (Sample)', time: '8:00 PM', taken: false }
  ]);

  const toggleDemoMed = (id) => {
    setSampleDemoMeds(prev =>
      prev.map(m => m.id === id ? { ...m, taken: !m.taken } : m)
    );
  };

  const instructions = [
    {
      id: 'meds',
      title: '💊 How to take your morning medicine',
      steps: [
        'Take 1 tablet with a full glass of warm water.',
        'Take it 15 minutes before your morning breakfast.',
        'Sit comfortably in your chair for 5 minutes after taking it.'
      ]
    },
    {
      id: 'stretch',
      title: '🧘 Gentle 5-minute chair breathing',
      steps: [
        'Sit upright with your feet flat on the floor.',
        'Inhale slowly through your nose for 4 counts.',
        'Exhale gently through your mouth for 4 counts. Repeat 5 times.'
      ]
    },
    {
      id: 'walk',
      title: '🚶 Garden walking guidelines',
      steps: [
        'Wear your supportive walking shoes.',
        'Walk along the paved garden path for 10-15 minutes.',
        'Take a sip of water whenever you pause on the bench.'
      ]
    }
  ];

  const showNotice = (msg) => {
    setPrototypeNotice(msg);
    setTimeout(() => setPrototypeNotice(null), 5000);
  };

  const todayDateString = new Intl.DateTimeFormat('en-IN', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  }).format(new Date());

  return (
    <div className="elder-theme" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      {/* Demo Data Notice */}
      <div
        style={{
          backgroundColor: '#fef3c7',
          border: '1.5px solid #d97706',
          borderRadius: '14px',
          padding: '0.75rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.5rem',
          fontSize: '0.95rem'
        }}
      >
        <span style={{ fontWeight: 800, color: '#92400e' }}>
          ⚠️ ELDER PROTOTYPE VIEW — DEMO DATA
        </span>
        <span style={{ color: '#78350f' }}>
          Medication tracking below is fully functional. Self-reported logs are stored in your active project backend.
        </span>
      </div>

      {/* Non-blocking feedback notice for elder */}
      {prototypeNotice && (
        <div
          style={{
            backgroundColor: 'var(--color-forest)',
            color: '#E9E4D8',
            padding: '1.25rem 2rem',
            borderRadius: '16px',
            boxShadow: 'var(--shadow-md)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '1.25rem',
            fontWeight: 600
          }}
          role="status"
        >
          <span>ℹ️ {prototypeNotice}</span>
          <button
            type="button"
            onClick={() => setPrototypeNotice(null)}
            style={{ color: '#E9E4D8', fontWeight: 800, fontSize: '1.5rem', marginLeft: '1rem', cursor: 'pointer' }}
            aria-label="Dismiss notice"
          >
            ✕
          </button>
        </div>
      )}

      {/* Top Welcome Bar */}
      <div
        style={{
          backgroundColor: 'var(--color-forest)',
          color: '#E9E4D8',
          padding: '2.25rem',
          borderRadius: '28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid rgba(233, 228, 216, 0.2)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <img
            src="/saanidhya-logo.svg"
            alt="SAANIDHYA Emblem"
            style={{
              width: '68px',
              height: '68px',
              borderRadius: '50%',
              backgroundColor: '#E9E4D8',
              padding: '3px',
              flexShrink: 0
            }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span style={{ fontSize: '1.1rem', color: '#A9BDA9', fontWeight: 600 }}>
                {todayDateString}
              </span>
              <span
                style={{
                  backgroundColor: 'rgba(199, 163, 108, 0.25)',
                  color: '#C7A36C',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  padding: '0.2rem 0.5rem',
                  borderRadius: '999px',
                  textTransform: 'uppercase'
                }}
              >
                Sample Persona
              </span>
            </div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-family-serif)', margin: '0.2rem 0' }}>
              Namaste, Shanti Ji 🙏
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#f7f5f0' }}>
              Together in care. Independent in life.
            </p>
          </div>
        </div>

        {/* Big Quick SOS Trigger in Header */}
        <button
          type="button"
          onClick={requestAssistance}
          className="btn elder-btn elder-sos-btn"
          style={{ minWidth: '240px', padding: '1.25rem 2rem' }}
          aria-label="Need Assistance Emergency Demonstration"
        >
          🚨 NEED ASSISTANCE (SOS DEMO)
        </button>
      </div>

      {/* Main 2-Column Action Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {/* Daily Well-being Check-in */}
        <Card isElder title="My Daily Care" subtitle="Tap once to test your daily well-being check-in interaction">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1rem' }}>
            <p style={{ fontSize: '1.25rem', color: '#173C38', lineHeight: 1.5 }}>
              How are you feeling today? Tap the button below to record your check-in.
            </p>
            <button
              type="button"
              onClick={() => setCheckedIn(true)}
              style={{
                backgroundColor: checkedIn ? '#2e7d32' : 'var(--color-champagne)',
                color: checkedIn ? '#ffffff' : 'var(--color-forest-dark)',
                fontSize: '1.45rem',
                fontWeight: 800,
                padding: '1.5rem',
                borderRadius: '20px',
                border: 'none',
                boxShadow: 'var(--shadow-md)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                transition: 'all 0.2s'
              }}
            >
              {checkedIn ? '✓ Check-in Recorded (Local Demo)' : '✨ I Am Feeling Good Today'}
            </button>
            {checkedIn && (
              <span style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', textAlign: 'center' }}>
                Note: Check-in saved on local screen. Real-time caregiver notification delivery requires backend Firestore integration.
              </span>
            )}
          </div>
        </Card>

        {/* My Care Circle Quick Contact */}
        <Card isElder title="My Care Circle" subtitle="One tap to test dialing sample family contacts">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            <button
              type="button"
              onClick={() => showNotice('Prototype Demo: Direct speed-dial to daughter (Priya) will initiate once WebRTC / telephony is configured.')}
              style={{
                backgroundColor: 'var(--color-forest)',
                color: '#E9E4D8',
                fontSize: '1.35rem',
                fontWeight: 700,
                padding: '1.35rem',
                borderRadius: '20px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem'
              }}
            >
              📞 Call Daughter (Priya - Demo)
            </button>
            <button
              type="button"
              onClick={() => showNotice('Prototype Demo: Direct clinic speed-dial to Dr. Sharma will initiate once telephony is configured.')}
              style={{
                backgroundColor: '#ffffff',
                color: 'var(--color-forest)',
                border: '3px solid var(--color-forest)',
                fontSize: '1.35rem',
                fontWeight: 700,
                padding: '1.25rem',
                borderRadius: '20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem'
              }}
            >
              🩺 Call Doctor (Dr. Sharma - Demo)
            </button>
          </div>
        </Card>
      </div>

      {/* Functional Medication Management Workflow (Live Timeline & Actions) */}
      <MedicationTimeline isElder={true} showAddButton={true} />

      {/* Preserved Sample Medication Schedule (Clearly Demarcated Reference) */}
      <div style={{ marginTop: '-0.5rem' }}>
        <button
          type="button"
          onClick={() => setShowDemoReference(prev => !prev)}
          style={{
            fontSize: '0.95rem',
            fontWeight: 700,
            color: 'var(--color-forest)',
            backgroundColor: 'transparent',
            border: 'none',
            textDecoration: 'underline',
            cursor: 'pointer',
            padding: '0.5rem 0'
          }}
        >
          {showDemoReference ? '▼ Hide Static Reference Schedule' : '▶ View Static Demonstration Schedule (Demo Reference)'}
        </button>

        {showDemoReference && (
          <div style={{ marginTop: '0.75rem' }}>
            <Card
              isElder
              title="Reference Medication Schedule (Demo Baseline)"
              subtitle="DEMO DATA — Preserved static illustrative schedule"
              headerAction={<StatusBadge label="DEMO DATA" variant="warning" />}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1rem' }}>
                {sampleDemoMeds.map((med) => (
                  <div
                    key={med.id}
                    onClick={() => toggleDemoMed(med.id)}
                    style={{
                      backgroundColor: med.taken ? 'rgba(169, 189, 169, 0.25)' : '#ffffff',
                      border: `2px solid ${med.taken ? 'var(--color-sage-dark)' : 'var(--color-border)'}`,
                      borderRadius: '16px',
                      padding: '1.25rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '1rem',
                      cursor: 'pointer'
                    }}
                  >
                    <div>
                      <span
                        style={{
                          backgroundColor: 'var(--color-forest)',
                          color: '#E9E4D8',
                          padding: '0.25rem 0.65rem',
                          borderRadius: '6px',
                          fontSize: '1rem',
                          fontWeight: 700
                        }}
                      >
                        {med.time}
                      </span>
                      <p
                        style={{
                          fontSize: '1.2rem',
                          fontWeight: 700,
                          color: 'var(--color-forest)',
                          marginTop: '0.35rem',
                          textDecoration: med.taken ? 'line-through' : 'none'
                        }}
                      >
                        {med.name}
                      </p>
                    </div>

                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '50%',
                        backgroundColor: med.taken ? '#2e7d32' : '#ffffff',
                        border: '2px solid #2e7d32',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                        fontSize: '1.5rem',
                        fontWeight: 800,
                        flexShrink: 0
                      }}
                    >
                      {med.taken ? '✓' : ''}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Easy Instructions & Upcoming Appointments Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {/* Easy Instructions */}
        <Card isElder title="Easy Instructions" subtitle="Clear, step-by-step guidance for daily activities">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            {instructions.map((ins) => (
              <div
                key={ins.id}
                style={{
                  backgroundColor: '#ffffff',
                  border: '2px solid var(--color-border)',
                  borderRadius: '16px',
                  padding: '1.25rem',
                  cursor: 'pointer'
                }}
                onClick={() => setSelectedInstruction(selectedInstruction === ins.id ? null : ins.id)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-forest)' }}>
                    {ins.title}
                  </h4>
                  <span style={{ fontSize: '1.25rem', color: 'var(--color-forest)', fontWeight: 800 }}>
                    {selectedInstruction === ins.id ? '▲' : '▼'}
                  </span>
                </div>
                {selectedInstruction === ins.id && (
                  <ol style={{ paddingLeft: '1.5rem', marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {ins.steps.map((st, i) => (
                      <li key={i} style={{ fontSize: '1.15rem', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                        {st}
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* My Appointments */}
        <Card
          isElder
          title="My Appointments (Sample)"
          subtitle="DEMO DATA — Scheduled clinical visits preview"
          headerAction={<StatusBadge label="DEMO DATA" variant="warning" />}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1rem' }}>
            <div
              style={{
                backgroundColor: 'var(--color-ivory-light)',
                border: '2px solid var(--color-sage)',
                borderRadius: '16px',
                padding: '1.35rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ backgroundColor: 'var(--color-forest)', color: '#E9E4D8', padding: '0.3rem 0.75rem', borderRadius: '8px', fontSize: '1rem', fontWeight: 700 }}>
                  Sample Visit
                </span>
                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-forest)' }}>
                  Tuesday • 10:30 AM
                </span>
              </div>
              <h4 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-forest)' }}>
                🩺 Dr. Sharma (Geriatric Care - Sample)
              </h4>
              <p style={{ fontSize: '1.15rem', color: 'var(--color-text-secondary)' }}>
                Routine health review at Columbia Clinic. Accompanied by daughter Priya (Demo Escort).
              </p>
            </div>

            <div
              style={{
                backgroundColor: 'var(--color-ivory-light)',
                border: '1.5px dashed var(--color-border)',
                borderRadius: '16px',
                padding: '1.25rem',
                fontSize: '1.05rem',
                color: 'var(--color-text-muted)'
              }}
            >
              🗓️ Next scheduled clinic transport is arranged automatically by family coordinators.
            </div>
          </div>
        </Card>
      </div>

      {/* SOS Modal Component */}
      <ElderSOSModal isOpen={isSOSOpen} onClose={() => setIsSOSOpen(false)} />
    </div>
  );
}
