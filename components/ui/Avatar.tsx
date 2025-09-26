import React from 'react';

interface Props {
  name: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Avatar: React.FC<Props> = (props) => {
  const { name, className = "", size = 'md' } = props;
  
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base'
  };
  
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
  
  return (
    <div className={`${sizeClasses[size]} bg-red-100 rounded-full flex items-center justify-center ${className}`}>
      <span className="text-red-600 font-medium">
        {initials}
      </span>
    </div>
  );
};
