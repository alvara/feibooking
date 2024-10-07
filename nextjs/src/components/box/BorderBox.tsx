import type { ReactNode } from 'react';
import { FadeInUp } from '../animation/FadeInUp';

export const BorderBox = ({
  id,
  title,
  children,
  className,
  onClick,
}: {
  id?: string | null;
  title?: ReactNode;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) => (
  <FadeInUp>
    <div
      id={id || undefined}
      className={`w-full p-8 mb-4 border border-gray rounded-xl ${className}`}
      onClick={onClick}
    >
      <div className="mb-4">{title}</div>
      {children}
    </div>
  </FadeInUp>
);
