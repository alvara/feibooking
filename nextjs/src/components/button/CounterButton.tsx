import type { ReactNode } from 'react';

export function CounterButton({
  icon,
  className,
  htmlFor,
  label,
}: {
  icon: ReactNode;
  htmlFor?: string;
  className?: string;
  label?: string | ReactNode;
}) {
  return (
    <div className="flex flex-row items-center ">
      <label
        htmlFor={htmlFor}
        className={`px-0 gap-1 flex py-1 border-base-200 dark:border-base-300 bg-transparent dark:bg-transparent cursor-pointer ${className}`}
      >
        {icon}
        <div className="text-sm ">{label}</div>
      </label>
    </div>
  );
}
