import React from 'react';

export default function Card({
  children,
  className = '',
  isElder = false,
  title = null,
  subtitle = null,
  headerAction = null
}) {
  const baseClass = isElder ? 'saanidhya-card elder-card' : 'saanidhya-card';

  return (
    <div className={`${baseClass} ${className}`}>
      {(title || subtitle || headerAction) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
          <div>
            {title && (
              <h3 style={{
                fontSize: isElder ? '1.5rem' : '1.15rem',
                fontWeight: 700,
                color: 'var(--color-forest)',
                marginBottom: '0.25rem'
              }}>
                {title}
              </h3>
            )}
            {subtitle && (
              <p style={{
                fontSize: isElder ? '1.05rem' : '0.85rem',
                color: 'var(--color-text-secondary)'
              }}>
                {subtitle}
              </p>
            )}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
