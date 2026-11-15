import React from 'react';
import { useMode, MODES } from '../../context/ModeContext';
import Card from '../common/Card';
import Button from '../common/Button';

export default function LandingHero() {
  const { selectMode } = useMode();

  const coreCapabilities = [
    {
      title: 'My Daily Care',
      desc: 'Capability designed for senior-friendly morning and evening check-ins, routine verification, and comfort signaling.',
      icon: '☀️',
      tag: 'Capability'
    },
    {
      title: 'My Care Circle',
      desc: 'Capability architected to connect adult children, nearby relatives, family physicians, and nurses into a synchronized circle.',
      icon: '🌿',
      tag: 'Capability'
    },
    {
      title: 'Care Handover',
      desc: 'Capability structured for shift transition logs, vital checklists, and observation notes between family and caregivers.',
      icon: '🤝',
      tag: 'Capability'
    },
    {
      title: 'My Appointments',
      desc: 'Capability designed to coordinate clinic consultations, diagnostic visits, prescription pickups, and accompaniment schedules.',
      icon: '🗓️',
      tag: 'Capability'
    },
    {
      title: 'Need Assistance',
      desc: 'Capability engineered for prominent, single-touch urgent assistance access with strict safety disclosures.',
      icon: '🚨',
      tag: 'Capability'
    },
    {
      title: 'Care History',
      desc: 'Capability planned to aggregate chronological routine compliance, check-in history, and long-term activity trends.',
      icon: '📜',
      tag: 'Capability'
    },
    {
      title: 'Care Alerts',
      desc: 'Capability architected for scheduled dose reminders, clinical appointment notices, and proactive family alerts.',
      icon: '🔔',
      tag: 'Capability'
    },
    {
      title: 'Easy Instructions',
      desc: 'Capability designed for plain-language, high-legibility visual guidance for daily medications and gentle wellness routines.',
      icon: '📖',
      tag: 'Capability'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      {/* Hero Section */}
      <section
        style={{
          backgroundColor: 'var(--color-forest)',
          color: '#E9E4D8',
          borderRadius: '28px',
          padding: '4rem 2rem',
          boxShadow: 'var(--shadow-lg)',
          textAlign: 'center',
          position: 'relative',
          border: '1px solid rgba(233, 228, 216, 0.15)'
        }}
      >
        <div style={{ maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
          
          {/* Official Emblem */}
          <div
            style={{
              padding: '6px',
              borderRadius: '50%',
              backgroundColor: 'rgba(233, 228, 216, 0.15)',
              display: 'inline-flex',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            <img
              src="/saanidhya-logo.svg"
              alt="SAANIDHYA Official Emblem"
              style={{
                width: '92px',
                height: '92px',
                borderRadius: '50%',
                display: 'block'
              }}
            />
          </div>

          <div style={{ display: 'inline-flex' }}>
            <span
              style={{
                backgroundColor: 'rgba(199, 163, 108, 0.2)',
                color: '#C7A36C',
                padding: '0.4rem 1.25rem',
                borderRadius: '999px',
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                border: '1px solid rgba(199, 163, 108, 0.35)'
              }}
            >
              SAANIDHYA • Together in care. Independent in life.
            </span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-family-serif)',
              fontSize: 'clamp(2.3rem, 5.5vw, 3.5rem)',
              lineHeight: 1.15,
              fontWeight: 700,
              color: '#f7f5f0',
              margin: '0.5rem 0'
            }}
          >
            Care that surrounds them.<br />Dignity that empowers them.
          </h2>

          <p
            style={{
              fontSize: '1.2rem',
              color: '#A9BDA9',
              lineHeight: 1.6,
              maxWidth: '680px',
              margin: '0 auto'
            }}
          >
            SAANIDHYA brings elderly individuals, family members and caregivers together through thoughtful, connected care — while keeping independence at the heart of every decision.
          </p>

          {/* Primary Dual Entry Buttons */}
          <div
            style={{
              display: 'flex',
              gap: '1.25rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginTop: '1.25rem'
            }}
          >
            <Button
              variant="champagne"
              size="lg"
              onClick={() => selectMode(MODES.ELDER)}
              style={{ fontSize: '1.15rem', padding: '1.1rem 2.25rem' }}
            >
              👵 Enter Elder Mode
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => selectMode(MODES.CAREGIVER)}
              style={{ fontSize: '1.15rem', padding: '1.1rem 2.25rem' }}
            >
              👨‍👩‍👧 Enter Family & Caregiver Mode
            </Button>
          </div>
        </div>
      </section>

      {/* Dual Experience Cards */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {/* Elder Mode Overview */}
        <Card
          title="Elder Mode Experience"
          subtitle="Designed with large tap targets, high contrast, and zero cognitive strain."
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1rem' }}>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1rem' }}>
                <span style={{ color: 'var(--color-forest)', fontSize: '1.25rem', fontWeight: 800 }}>✓</span>
                <span>Single-touch Emergency SOS assistance with prominent safety guidance</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1rem' }}>
                <span style={{ color: 'var(--color-forest)', fontSize: '1.25rem', fontWeight: 800 }}>✓</span>
                <span>Large visual medication checklist with clear confirmation toggles</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1rem' }}>
                <span style={{ color: 'var(--color-forest)', fontSize: '1.25rem', fontWeight: 800 }}>✓</span>
                <span>Simple daily "I am feeling good today" well-being check-in</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1rem' }}>
                <span style={{ color: 'var(--color-forest)', fontSize: '1.25rem', fontWeight: 800 }}>✓</span>
                <span>Easy step-by-step health instructions and speed-dial family connects</span>
              </li>
            </ul>

            <Button
              variant="primary"
              onClick={() => selectMode(MODES.ELDER)}
              style={{ width: '100%', marginTop: '0.75rem' }}
            >
              Open Elder Mode →
            </Button>
          </div>
        </Card>

        {/* Family & Caregiver Mode Overview */}
        <Card
          title="Family & Caregiver Portal"
          subtitle="Holistic health observability, routine coordination, and family peace of mind."
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1rem' }}>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1rem' }}>
                <span style={{ color: 'var(--color-champagne-dark)', fontSize: '1.25rem', fontWeight: 800 }}>✓</span>
                <span>Daily Care Overview with routine adherence metrics layout</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1rem' }}>
                <span style={{ color: 'var(--color-champagne-dark)', fontSize: '1.25rem', fontWeight: 800 }}>✓</span>
                <span>Care Handover shift logging between family members and nurses</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1rem' }}>
                <span style={{ color: 'var(--color-champagne-dark)', fontSize: '1.25rem', fontWeight: 800 }}>✓</span>
                <span>Structured My Care Circle coordination and clinical appointment view</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1rem' }}>
                <span style={{ color: 'var(--color-champagne-dark)', fontSize: '1.25rem', fontWeight: 800 }}>✓</span>
                <span>Architecture prepared for Google Gemini AI automated care briefings</span>
              </li>
            </ul>

            <Button
              variant="champagne"
              onClick={() => selectMode(MODES.CAREGIVER)}
              style={{ width: '100%', marginTop: '0.75rem' }}
            >
              Open Caregiver Portal →
            </Button>
          </div>
        </Card>
      </section>

      {/* 8 Core Product Capabilities Overview */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '740px', margin: '0 auto' }}>
          <span
            style={{
              color: 'var(--color-champagne-dark)',
              fontSize: '0.85rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}
          >
            Product Capabilities
          </span>
          <h3
            style={{
              fontFamily: 'var(--font-family-serif)',
              fontSize: '2.25rem',
              color: 'var(--color-forest)',
              marginTop: '0.25rem'
            }}
          >
            Core Architectural Capabilities
          </h3>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', marginTop: '0.5rem' }}>
            The eight functional pillars architected to unify senior independence and caregiver collaboration.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {coreCapabilities.map((feat, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '18px',
                padding: '1.5rem',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '2rem' }}>{feat.icon}</span>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: 'var(--color-forest)',
                    backgroundColor: 'rgba(169, 189, 169, 0.25)',
                    padding: '0.25rem 0.65rem',
                    borderRadius: '999px'
                  }}
                >
                  {feat.tag}
                </span>
              </div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-forest)' }}>
                {feat.title}
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
