import React from 'react';

export default function StatusBadge({
  label,
  variant = 'forest', // 'forest' | 'sage' | 'champagne' | 'success' | 'warning'
  dot = true
}) {
  const getVariantClass = () => {
    switch (variant) {
      case 'sage':
        return 'badge-sage';
      case 'champagne':
        return 'badge-champagne';
      case 'success':
        return 'badge-success';
      case 'warning':
        return 'badge-warning';
      case 'forest':
      default:
        return 'badge-forest';
    }
  };

  return (
    <span className={`badge ${getVariantClass()}`}>
      {dot && (
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: 'currentColor'
          }}
        />
      )}
      {label}
    </span>
  );
}
