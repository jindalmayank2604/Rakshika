import React from 'react';

export const GlassCard = ({
  children,
  className = '',
  hoverEffect = false,
  variant = 'default',
  onClick,
  ...props
}) => {
  const baseClasses = 'backdrop-blur-md rounded-2xl border transition-all duration-300';
  
  const variants = {
    default: 'glass-card',
    subtle: 'glass-card-subtle',
    solid: 'glass-card-solid',
    emergency: 'glass-card-emergency',
    indigo: 'glass-card-accent'
  };

  const hoverClasses = hoverEffect ? 'glass-card-hover hover:-translate-y-1 cursor-pointer' : '';

  return (
    <div
      className={`${baseClasses} ${variants[variant] || variants.default} ${hoverClasses} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};
