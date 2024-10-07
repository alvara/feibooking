import type { ReactNode } from 'react';

export const BorderBoxWithTitle = ({
  title,
  children,
}: {
  title: ReactNode;
  children: ReactNode;
}) => (
  <div className="w-full p-8 mb-8 border rounded-xl">
    <h3 className="mt-0 mb-4 text-xl">{title}</h3>
    {children}
  </div>
);
