import { IconChevronRight } from '@tabler/icons-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

export function MenuLink({
  href,
  label,
  icon,
  target,
}: {
  href: string;
  label: string;
  icon: ReactNode;
  target?: string;
}) {
  return (
    <>
      <Link
        href={href}
        className="flex items-center justify-between w-full font-bold no-underline gap 2 text-body1"
        target={target}
      >
        <div className="flex items-center gap-2 ">
          <span className="flex w-7">{icon}</span>
          <span style={{ whiteSpace: 'pre-wrap' }}>{label}</span>
        </div>
        <IconChevronRight className="text-primary" size={32} />
      </Link>
      <div className="my-2 divider" />
    </>
  );
}
