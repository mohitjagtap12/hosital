import React from 'react';

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  isLoading = false,
  className = '',
  disabled,
  id,
  ...props
}) => {
  let variantStyles = '';
  if (variant === 'primary') {
    variantStyles = 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm active:bg-emerald-900 focus-visible:ring-2 focus-visible:ring-emerald-500';
  } else if (variant === 'secondary') {
    variantStyles = 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-200 focus-visible:ring-2 focus-visible:ring-emerald-400';
  } else if (variant === 'outline') {
    variantStyles = 'bg-transparent border border-emerald-700 text-emerald-700 hover:bg-emerald-50 focus-visible:ring-2 focus-visible:ring-emerald-500';
  } else if (variant === 'ghost') {
    variantStyles = 'bg-transparent hover:bg-slate-100 text-slate-700 focus-visible:ring-2 focus-visible:ring-slate-400';
  } else if (variant === 'danger') {
    variantStyles = 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm focus-visible:ring-2 focus-visible:ring-rose-400';
  }

  let sizeStyles = '';
  if (size === 'sm') {
    sizeStyles = 'px-3.5 py-2 text-xs font-medium min-h-[38px] rounded-lg gap-1.5';
  } else if (size === 'md') {
    sizeStyles = 'px-4 py-2.5 text-sm font-medium min-h-[44px] rounded-xl gap-2';
  } else if (size === 'lg') {
    sizeStyles = 'px-6 py-3.5 text-base font-semibold min-h-[50px] rounded-xl gap-2.5';
  }

  const widthStyle = fullWidth ? 'w-full' : '';
  const disabledStyle = (disabled || isLoading) ? 'opacity-60 cursor-not-allowed pointer-events-none' : 'cursor-pointer active:scale-[0.99] transition-transform duration-100';

  return (
    <button
      id={id || 'custom-button'}
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center transition-colors outline-none select-none font-medium ${variantStyles} ${sizeStyles} ${widthStyle} ${disabledStyle} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="inline-flex shrink-0">{icon}</span>}
          <span>{children}</span>
          {icon && iconPosition === 'right' && <span className="inline-flex shrink-0">{icon}</span>}
        </>
      )}
    </button>
  );
};
