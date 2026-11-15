import React from 'react';
import { useMode, MODES } from '../../context/ModeContext';
import StatusBadge from './StatusBadge';

export default function Header() {
  const { currentMode, selectMode, backendHealth } = useMode();

  return (
    <header className="site-header">
      <div className="header-inner">
        {/* Brand identity */}
        <div
          className="brand-section"
          onClick={() => selectMode(MODES.LANDING)}
          style={{ cursor: 'pointer' }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && selectMode(MODES.LANDING)}
        >
          <img
            src="/saanidhya-logo.svg"
            alt="SAANIDHYA Official Emblem"
            style={{ width: '46px', height: '46px', borderRadius: '50%', flexShrink: 0, boxShadow: 'var(--shadow-sm)' }}
          />
          <div>
            <h1 className="brand-title">SAANIDHYA</h1>
            <p className="brand-tagline">Together in care. Independent in life.</p>
          </div>
        </div>

        {/* Mode Selector and System Status */}
        <div className="header-actions">
          {/* Backend Connection Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {backendHealth.status === 'connected' ? (
              <StatusBadge label="API Online" variant="success" />
            ) : backendHealth.status === 'checking' ? (
              <StatusBadge label="Checking API" variant="champagne" />
            ) : (
              <StatusBadge label="API Local Mode" variant="warning" />
            )}
          </div>

          {/* Mode Switcher Buttons */}
          <nav aria-label="Mode Navigation" className="mode-toggle-group">
            <button
              type="button"
              className={`mode-toggle-btn ${currentMode === MODES.LANDING ? 'active' : ''}`}
              onClick={() => selectMode(MODES.LANDING)}
            >
              Overview
            </button>
            <button
              type="button"
              className={`mode-toggle-btn ${currentMode === MODES.ELDER ? 'active' : ''}`}
              onClick={() => selectMode(MODES.ELDER)}
              aria-label="Switch to Elder Mode (Large Controls)"
            >
              👵 Elder Mode
            </button>
            <button
              type="button"
              className={`mode-toggle-btn ${currentMode === MODES.CAREGIVER ? 'active' : ''}`}
              onClick={() => selectMode(MODES.CAREGIVER)}
              aria-label="Switch to Caregiver & Family Mode"
            >
              👨‍👩‍👧 Family/Caregiver
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
