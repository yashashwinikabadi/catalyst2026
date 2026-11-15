import React from 'react';

export default function Button({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'champagne' | 'outline' | 'danger'
  size = 'md',         // 'sm' | 'md' | 'lg' | 'elder'
  icon = null,
  onClick,
  className = '',
  disabled = false,
  type = 'button',
  ariaLabel
}) {
  const getVariantClass = () => {
    switch (variant) {
      case 'secondary':
        return 'btn-secondary';
      case 'champagne':
        return 'btn-champagne';
      case 'outline':
        return 'btn-outline';
      case 'danger':
        return 'elder-sos-btn';
      case 'primary':
      default:
        return 'btn-primary';
    }
  };

  const getSizeClass = () => {
    if (size === 'elder') return 'elder-btn';
    if (size === 'lg') return 'btn-lg';
    if (size === 'sm') return 'btn-sm';
    return '';
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`btn ${getVariantClass()} ${getSizeClass()} ${className}`}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
