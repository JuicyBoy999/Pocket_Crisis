import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'text';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'rounded-full font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantStyles = {
    primary: 'bg-sky-400 text-white hover:bg-sky-500 focus:ring-sky-400',
    secondary: 'bg-lavender-400 text-white hover:bg-lavender-500 focus:ring-lavender-400',
    danger: 'bg-red-400 text-white hover:bg-red-500 focus:ring-red-400',
    text: 'bg-transparent text-sky-600 hover:text-sky-700 focus:ring-sky-400',
  };

  const sizeStyles = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-6 text-base',
    lg: 'py-3 px-8 text-lg',
  };

  const widthStyles = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;