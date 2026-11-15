import React, { createContext, useContext, useState, useEffect } from 'react';

const ModeContext = createContext();

export const MODES = {
  LANDING: 'landing',
  ELDER: 'elder',
  CAREGIVER: 'caregiver'
};

export function ModeProvider({ children }) {
  // Check localStorage for saved mode preference, default to landing
  const [currentMode, setCurrentMode] = useState(() => {
    try {
      const saved = localStorage.getItem('saanidhya_mode');
      return saved || MODES.LANDING;
    } catch {
      return MODES.LANDING;
    }
  });

  const [backendHealth, setBackendHealth] = useState({
    status: 'checking',
    data: null,
    error: null
  });

  const selectMode = (mode) => {
    setCurrentMode(mode);
    try {
      localStorage.setItem('saanidhya_mode', mode);
    } catch {
      // Ignore localStorage errors
    }
  };

  // Check backend health endpoint using environment URL or local dev proxy fallback
  const checkBackendHealth = async () => {
    try {
      setBackendHealth(prev => ({ ...prev, status: 'checking' }));
      const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
      const healthUrl = apiBaseUrl ? `${apiBaseUrl}/health` : '/health';

      const response = await fetch(healthUrl);
      if (response.ok) {
        const data = await response.json();
        setBackendHealth({ status: 'connected', data, error: null });
      } else {
        setBackendHealth({
          status: 'unavailable',
          data: null,
          error: `HTTP error: ${response.status}`
        });
      }
    } catch (err) {
      setBackendHealth({
        status: 'disconnected',
        data: null,
        error: err.message || 'Could not connect to backend service'
      });
    }
  };

  useEffect(() => {
    checkBackendHealth();
    const interval = setInterval(checkBackendHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ModeContext.Provider
      value={{
        currentMode,
        selectMode,
        isElderMode: currentMode === MODES.ELDER,
        isCaregiverMode: currentMode === MODES.CAREGIVER,
        isLandingMode: currentMode === MODES.LANDING,
        backendHealth,
        refreshHealth: checkBackendHealth
      }}
    >
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
}
