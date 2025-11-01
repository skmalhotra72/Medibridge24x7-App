import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = false }: CardProps) {
  const hoverStyles = hover ? 'hover:shadow-xl hover:-translate-y-1 transition-all duration-300' : '';

  return (
    <div className={`bg-white rounded-2xl p-6 md:p-8 shadow-md ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
}
