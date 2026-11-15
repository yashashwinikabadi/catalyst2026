import React from 'react';
import Card from './Card';
import StatusBadge from './StatusBadge';

export default function ActivityTimeline() {
  const sampleEvents = [
    {
      time: '10:15 AM',
      title: 'Daily Well-Being Check-in (Sample)',
      desc: 'Elder tapped "Feeling Good" on device interface',
      tag: 'Check-in',
      color: '#2e7d32'
    },
    {
      time: '09:15 AM',
      title: 'Mobility Activity (Sample)',
      desc: 'Gentle mobility registered in garden and living area',
      tag: 'Activity',
      color: 'var(--color-champagne-dark)'
    },
    {
      time: '08:00 AM',
      title: 'Morning Medication (Sample)',
      desc: 'Morning routine scheduled pill marked as taken',
      tag: 'Medication',
      color: 'var(--color-forest)'
    },
    {
      time: '07:15 AM',
      title: 'Wakeup Routine (Sample)',
      desc: 'Rest cycle recorded as complete',
      tag: 'Sleep',
      color: 'var(--color-sage-dark)'
    }
  ];

  return (
    <Card
      title="Activity & Care Stream"
      subtitle="Sample event stream (Requires Cloud Firestore & device sync)"
      headerAction={<StatusBadge label="DEMO DATA" variant="warning" />}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.75rem' }}>
        {/* Demo notification banner */}
        <div
          style={{
            backgroundColor: 'var(--color-ivory-light)',
            border: '1px dashed var(--color-border)',
            borderRadius: '10px',
            padding: '0.5rem 0.75rem',
            fontSize: '0.75rem',
            color: 'var(--color-text-muted)'
          }}
        >
          ℹ️ Events below illustrate the caregiver timeline layout. Real event logs will appear once backend event persistence is integrated.
        </div>

        {sampleEvents.map((event, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'flex-start',
              position: 'relative'
            }}
          >
            {/* Timeline dot */}
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: event.color,
                marginTop: '0.4rem',
                flexShrink: 0,
                boxShadow: '0 0 0 3px rgba(23, 60, 56, 0.08)'
              }}
            />

            <div style={{ flex: 1, paddingBottom: index < sampleEvents.length - 1 ? '0.85rem' : 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-forest)' }}>
                  {event.title}
                </h4>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                  {event.time}
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '0.15rem' }}>
                {event.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
