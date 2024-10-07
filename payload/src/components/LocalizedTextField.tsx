import React from 'react';
import { useField } from 'payload/components/forms';
import { useLocale } from 'payload/components/utilities';

interface LocalizedTextFieldProps {
  label: React.ReactNode;
  required: boolean;
  path: string;
}

const SUPPORTED_LOCALES = ['en', 'ja'];

export function LocalizedTextField({ label, required, path }: LocalizedTextFieldProps) {
  const { value, setValue } = useField<string>({ path });
  const { code } = useLocale();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  function changeLocale(newLocale: string) {
    if (SUPPORTED_LOCALES.includes(newLocale)) {
      updateQueryParam('locale', newLocale);
      window.location.reload();
    }
  }

  function updateQueryParam(key: string, value: string) {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(key, value);
    const newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
    history.pushState(null, '', newRelativePathQuery);
  }

  return (
    <div className="field-type text">
      <div className="field-label-wrapper flex items-center justify-start">
        <label htmlFor={path} className="field-label">
          {typeof label === 'string' ? label : null}
          {required && <span className="required">*</span>}
        </label>
        <div className="locale-switcher flex space-x-1 ml-2 bg-base-200">
          {SUPPORTED_LOCALES.map((supportedLocale) => (
            <button
              key={supportedLocale}
              type="button"
              onClick={() => changeLocale(supportedLocale)}
              className={`locale-button px-2 py-0.5 text-xs font-medium rounded transition-colors duration-200 border-none ${
                code === supportedLocale
                  ? 'bg-base-300 '
                  : 'bg-transparent  hover:bg-base-200 hover:text-base-800'
              }`}
            >
              {supportedLocale.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      <div className="field-inner">
        <div className="input-wrapper">
          <input
            id={path}
            type="text"
            value={value || ''}
            onChange={handleChange}
            placeholder={typeof label === 'string' ? label : undefined}
            className="w-full px-3 py-2 border border-base-300 rounded-md focus:outline-none focus:ring-2 focus:ring-base-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
}
