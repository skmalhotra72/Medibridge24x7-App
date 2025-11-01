import { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  className?: string;
  background?: 'white' | 'gradient' | 'dark';
  children: ReactNode;
}

export default function Section({ id, className = '', background = 'white', children }: SectionProps) {
  const backgroundStyles = {
    white: 'bg-white',
    gradient: 'bg-gradient-subtle',
    dark: 'bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white',
  };

  return (
    <section id={id} className={`py-16 md:py-24 ${backgroundStyles[background]} ${className}`}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        {children}
      </div>
    </section>
  );
}
