import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'default' | 'narrow' | 'wide' | 'full';
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  size = 'default',
}) => {
  const sizeMap = {
    narrow: 'max-w-5xl',
    default: 'max-w-7xl',
    wide: 'max-w-[1400px]',
    full: 'w-full',
  };

  return (
    <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${sizeMap[size]} ${className}`}>
      {children}
    </div>
  );
};

export default Container;

