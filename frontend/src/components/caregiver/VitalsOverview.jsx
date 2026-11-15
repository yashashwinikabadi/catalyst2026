import React, { useState } from 'react';
import Card from '../common/Card';
import StatusBadge from '../common/StatusBadge';

export default function VitalsOverview() {
  const [showSampleData, setShowSampleData] = useState(false);

  const vitalsDisconnected = [
    {
      label: 'Heart Rate',
      value: '--',
      unit: 'BPM',
      status: 'Sensor Unpaired',
      badgeVariant: 'warning',
      icon: '❤️',
      sampleValue: '72 (Sample)'
    },
    {
      label: 'Blood Pressure',
      value: '--/--',
      unit: 'mmHg',
      status: 'Sensor Unpaired',
      badgeVariant: 'warning',
      icon: '🩺',
      sampleValue: '120/80 (Sample)'
    },
    {
      label: 'Oxygen Saturation',
      value: '--',
      unit: '% SpO2',
      status: 'Sensor Unpaired',
      badgeVariant: 'warning',
      icon: '🫁',
      sampleValue: '98% (Sample)'
    },
    {
      label: 'Sleep Rest',
      value: '--',
      unit: 'Hours',
      status: 'Sensor Unpaired',
      badgeVariant: 'warning',
      icon: '🌙',
      sampleValue: '7.5 (Sample)'
    }
  ];

  return (
    <Card
      title="Health Vitals Telemetry"
      subtitle="Biometric monitor connectivity & device stream status"
      headerAction={
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            type="button"
            onClick={() => setShowSampleData(prev => !prev)}
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '0.35rem 0.75rem',
              borderRadius: '999px',
              border: '1px solid var(--color-champagne-dark)',
              backgroundColor: showSampleData ? 'var(--color-champagne)' : 'transparent',
              color: 'var(--color-forest)',
              cursor: 'pointer'
            }}
          >
            {showSampleData ? 'Show Unpaired State' : 'Preview Sample Layout'}
          </button>
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.75rem' }}>
        {/* Prominent Demo / Disconnected Notice */}
        <div
          style={{
            backgroundColor: '#fef3c7',
            border: '1.5px solid #d97706',
            borderRadius: '12px',
            padding: '0.75rem 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.5rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.25rem' }}>⚠️</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#92400e', letterSpacing: '0.04em' }}>
              DEMO DATA — NO SENSORS CONNECTED
            </span>
          </div>
          <span style={{ fontSize: '0.75rem', color: '#78350f' }}>
            {showSampleData ? 'Displaying mock illustration for UI layout' : 'Real-time telemetry requires paired Bluetooth/IoT sensors'}
          </span>
        </div>

        {/* Vitals Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
          {vitalsDisconnected.map((v, i) => (
            <div
              key={i}
              style={{
                padding: '1.25rem',
                backgroundColor: 'var(--color-ivory-light)',
                borderRadius: '16px',
                border: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '1.5rem' }}>{v.icon}</span>
                <StatusBadge
                  label={showSampleData ? 'Demo Sample' : v.status}
                  variant={showSampleData ? 'sage' : v.badgeVariant}
                />
              </div>

              <div>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
                  {v.label}
                </span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem', marginTop: '0.2rem' }}>
                  <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-forest)' }}>
                    {showSampleData ? v.sampleValue : v.value}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                    {v.unit}
                  </span>
                </div>
              </div>

              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                {showSampleData ? 'Illustrative sample only' : 'Awaiting sensor integration'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
