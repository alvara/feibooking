import React from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import { InputLabel } from './InputLabel';

interface TextAreaProps {
  register: UseFormRegisterReturn;
  placeholder?: string;
  label?: string;
  labelBottom?: string | React.ReactNode;
  readonly?: boolean;
}

export function TextArea({ register, placeholder, label, labelBottom, readonly }: TextAreaProps) {
  const {
    formState: { errors },
  } = useFormContext();
  const fieldName = register.name;

  return (
    <>
      <div className="w-full form-control">
        {label && <InputLabel>{label}</InputLabel>}
        <div className="flex items-center">
          {/* Placeholder for icon to match TextField */}

          <div className="w-full">
            {/* textarea area */}
            <textarea
              placeholder={placeholder}
              {...register}
              readOnly={readonly}
              disabled={readonly}
              className={`w-full bg-white input border-gray h-40 placeholder-gray-darkest pt-4  ${
                errors[fieldName] ? 'border-red-500' : ''
              }`}
            />

            {/* error message */}
            {errors[fieldName] && (
              <span className="text-red-500 label-text-alt">
                {errors[fieldName]?.message && <>{errors[fieldName]?.message}</>}
              </span>
            )}
          </div>
        </div>

        <label className="label">
          {labelBottom && <span className="label-text-alt">{labelBottom}</span>}
        </label>
      </div>
    </>
  );
}
