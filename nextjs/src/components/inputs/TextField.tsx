import type { ReactNode } from 'react';
import React from 'react';
import type { RegisterOptions } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import { InputLabel } from './InputLabel';

interface TextFieldProps {
  name: string; // Add name prop
  type: string;
  placeholder?: string;
  validation?: RegisterOptions;
  label?: string;
  labelBottom?: string | ReactNode;
  readonly?: boolean;
  displayErrorLabel?: boolean;
  innerInputEndLabel?: ReactNode;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
}

export function TextField({
  name,
  type,
  placeholder,
  validation,
  label,
  labelBottom,
  readonly,
  displayErrorLabel = true,
  innerInputEndLabel,
  onKeyDown,
  autoFocus = false,
}: TextFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext(); // Use useFormContext to get register

  return (
    <>
      <div className="w-full mb-4 form-control">
        {label && <InputLabel>{label}</InputLabel>}
        <div className="flex items-center">
          <div className="w-full">
            {/* input area */}
            <div className="relative">
              <input
                type={type}
                placeholder={placeholder}
                {...register(name, validation)} // Use register with name and validation
                readOnly={readonly}
                onKeyDown={onKeyDown}
                disabled={readonly}
                autoFocus={autoFocus}
                className={`w-full input input-bordered h-12 ${errors[name] ? 'border-error' : ''}`}
              />

              {/* InnerInputEndLabel */}
              {innerInputEndLabel && (
                <div className="absolute top-0 right-0 mt-2 mr-2">{innerInputEndLabel}</div>
              )}
            </div>

            {/* error message */}
            <span>
              {displayErrorLabel && errors[name] && (
                <span className="text-error label-text-alt">
                  {errors[name]?.message?.toString()}
                </span>
              )}
            </span>
          </div>
        </div>

        {/* Bottom Label */}
        {labelBottom && (
          <label className="label">
            <span className="label-text-alt">{labelBottom}</span>
          </label>
        )}
      </div>
    </>
  );
}
