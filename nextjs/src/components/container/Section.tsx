import { pageConfig } from '@/data/pageConfig';
import { cn } from '@/lib/utils';

import type { ReactNode } from 'react';

export function Section({
  children,
  className,
  wrapperClassName,
  verticalSpacing = 'py-16',
}: {
  children: ReactNode;
  className?: string;
  wrapperClassName?: string;
  verticalSpacing?: 'py-0' | 'py-16' | 'py-32';
}) {
  return (
    <div className={wrapperClassName}>
      <div
        className={cn(
          `mx-auto `,
          {
            'py-0': verticalSpacing === 'py-0',
            'py-16': verticalSpacing === 'py-16',
            'py-32': verticalSpacing === 'py-32',
          },
          className,
          `max-w-[${pageConfig.MAX_WIDTH}px] px-4`,
        )}
      >
        {children}
      </div>
    </div>
  );
}
