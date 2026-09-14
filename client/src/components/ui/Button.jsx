import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  icon: Icon,
  onClick,
  type = 'button',
  ...props
}) => {
  const base = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100';

  const variants = {
    primary: 'bg-wine-plum hover:bg-[#5c293c] dark:bg-smoky-rose dark:hover:bg-smoky-rose-600 text-bone dark:text-white font-bold shadow-md focus:ring-accent',
    secondary: 'bg-smoky-rose hover:bg-smoky-rose-600 dark:bg-wine-plum dark:hover:bg-wine-plum-700 text-bone font-bold shadow-md focus:ring-accent',
    outline: 'border border-dust-grey/80 dark:border-smoky-rose/50 bg-white/80 hover:bg-white dark:bg-wine-plum/60 dark:hover:bg-wine-plum/90 text-wine-plum dark:text-bone hover:text-wine-plum dark:hover:text-white font-semibold focus:ring-accent',
    ghost: 'text-wine-plum dark:text-bone hover:text-wine-plum dark:hover:text-white hover:bg-powder-petal/60 dark:hover:bg-smoky-rose/30 font-semibold focus:ring-accent',
    emergency: 'bg-emergency hover:bg-rose-700 text-white font-bold shadow-md shadow-rose-500/30 focus:ring-rose-500',
    glass: 'bg-white/90 hover:bg-white dark:bg-wine-plum/80 dark:hover:bg-wine-plum text-wine-plum dark:text-bone border border-dust-grey/70 dark:border-smoky-rose/40 font-semibold shadow-sm focus:ring-accent',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5 font-semibold',
    icon: 'p-2.5'
  };

  return (
    <button
      type={type}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : Icon ? (
        <Icon className="w-4 h-4 flex-shrink-0" />
      ) : null}
      {children}
    </button>
  );
};
