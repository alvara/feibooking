import type { JSX } from 'react';

export function TableRow({ header, cell }: { header: string; cell: string | JSX.Element }) {
  return (
    <div className="flex flex-col border-b sm:flex-row border-gray ">
      <div className="p-6 font-semibold sm:font-medium basis-1/4 bg-gray-lightest">{header}</div>
      <div className="p-6 basis-3/4">{cell}</div>
    </div>
  );
}
