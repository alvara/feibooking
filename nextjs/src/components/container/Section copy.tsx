import React, { forwardRef } from 'react';

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const Section = forwardRef<HTMLDivElement, SectionProps>(
  ({ children, className, id, ...props }, ref) => {
    return (
      <div
        ref={ref}
        id={id}
        className={`mx-4 lg:mx-auto lg:container ${className || ''}`}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Section.displayName = 'Section';
