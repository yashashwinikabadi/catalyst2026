import React from 'react';
import { ModeProvider, useMode, MODES } from './context/ModeContext';
import { MedicationProvider } from './context/MedicationContext';
import Header from './components/common/Header';
import LandingHero from './components/landing/LandingHero';
import ElderDashboard from './components/elder/ElderDashboard';
import CaregiverDashboard from './components/caregiver/CaregiverDashboard';

function MainAppContent() {
  const { currentMode } = useMode();

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        {currentMode === MODES.ELDER && <ElderDashboard />}
        {currentMode === MODES.CAREGIVER && <CaregiverDashboard />}
        {currentMode === MODES.LANDING && <LandingHero />}
      </main>
      <footer
        style={{
          borderTop: '1px solid var(--color-border)',
          backgroundColor: '#ffffff',
          padding: '2rem 1.5rem',
          marginTop: 'auto',
          textAlign: 'center',
          color: 'var(--color-text-secondary)',
          fontSize: '0.85rem'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.65rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <img src="/saanidhya-logo.svg" alt="SAANIDHYA Logo" style={{ width: '26px', height: '26px', borderRadius: '50%' }} />
            <p style={{ fontWeight: 700, color: 'var(--color-forest)', fontSize: '1rem' }}>
              SAANIDHYA — Together in care. Independent in life.
            </p>
          </div>
          <p>
            Developed for the Catalyst 2026 AI Hackathon • Prepared for Google Cloud Run, Firebase & Google Gemini AI
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ModeProvider>
      <MedicationProvider>
        <MainAppContent />
      </MedicationProvider>
    </ModeProvider>
  );
}
