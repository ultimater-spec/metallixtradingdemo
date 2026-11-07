import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  to,
  icon,
  iconPosition = 'right',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#17191C] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none';

  const sizeClasses = {
    sm: 'text-xs px-3.5 py-2 min-h-[36px] gap-1.5',
    md: 'text-sm px-5 py-2.5 min-h-[44px] gap-2',
    lg: 'text-base px-6 py-3.5 min-h-[48px] gap-2.5',
  }[size];

  const variantClasses = {
    primary:
      'bg-[#B69A69] text-[#17191C] hover:bg-[#CBB285] focus:ring-[#B69A69] shadow-lg shadow-[#B69A69]/20 hover:shadow-xl hover:shadow-[#B69A69]/30 active:scale-[0.98]',
    secondary:
      'bg-[#23272C] text-[#F5F5F2] hover:bg-[#2E3339] border border-[#BFC3C8]/20 hover:border-[#B69A69]/40 focus:ring-[#BFC3C8]',
    outline:
      'bg-transparent text-[#F5F5F2] border border-[#BFC3C8]/30 hover:border-[#B69A69] hover:text-[#B69A69] focus:ring-[#B69A69]',
    ghost:
      'bg-transparent text-[#BFC3C8] hover:text-[#F5F5F2] hover:bg-[#23272C]/50 focus:ring-[#BFC3C8]',
    danger:
      'bg-red-900/80 text-red-200 border border-red-700/50 hover:bg-red-800 focus:ring-red-500',
  }[variant];

  const content = (
    <>
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
          <span>{children}</span>
          {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
        </>
      )}
    </>
  );

  const combinedClasses = `${baseClasses} ${sizeClasses} ${variantClasses} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} disabled={disabled || isLoading} {...props}>
      {content}
    </button>
  );
};

export default Button;

