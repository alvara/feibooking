import { IconCheck, IconCopy, IconLink } from '@tabler/icons-react';
import { useState } from 'react';

export function CopyToClipboard({ id, label }: { id: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(label);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="grid w-full  grid-cols-8 gap-0">
      <label htmlFor={id} className="input input-bordered flex items-center col-span-7">
        <IconLink />
        <input
          id={id}
          type="text"
          className=" w-full input input-bordered grow"
          value={label}
          disabled
        />
      </label>

      <button onClick={copyToClipboard} className="col-span-1 btn-primary btn" color="primary">
        {!copied ? (
          <span>
            <IconCopy />
          </span>
        ) : (
          <span className="inline-flex items-center">
            <IconCheck />
          </span>
        )}
      </button>
    </div>
  );
}
