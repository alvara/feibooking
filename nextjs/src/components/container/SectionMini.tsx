import type { ReactNode } from 'react';

export function SectionMini({
  children,
  className,
  wrapperClassName,
  addSpace = false,
}: {
  children: ReactNode;
  className?: string;
  wrapperClassName?: string;
  addSpace?: boolean;
}) {
  return (
    <div className={wrapperClassName}>
      <div className={`mx-auto max-w-2xl ${addSpace ? 'py-16' : 'py-0'} ${className}`}>
        {children}
      </div>
    </div>
  );
}
