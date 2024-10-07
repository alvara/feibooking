import React from 'react';
import type { RegisterOptions } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import { InputLabel } from './InputLabel';

interface Option {
  value: string;
  label: string;
}

interface RadioFieldProps {
  name: string;
  options: Option[];
  orientation?: 'horizontal' | 'vertical';
  validation?: RegisterOptions;
  label?: string;
  labelBottom?: string | React.ReactNode;
  displayErrorLabel?: boolean;
}

export const RadioField: React.FC<RadioFieldProps> = ({
  name,
  options,
  orientation = 'vertical',
  validation,
  label,
  labelBottom,
  displayErrorLabel = true,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const orientationClass = orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap';

  return (
    <>
      <div className="w-full mb-4 form-control ">
        {label && <InputLabel>{label}</InputLabel>}
        <div className={`flex ${orientationClass} items-center gap-4`}>
          {options.map((option) => (
            <label key={option.value} className="flex items-center gap-2">
              <input
                type="radio"
                value={option.value}
                {...register(name, validation)} // Use register with the name prop and validation
                className="radio radio-primary"
              />
              {option.label}
            </label>
          ))}
        </div>
        {displayErrorLabel && errors[name] && (
          <span className="text-error label-text-alt">{errors[name]?.message?.toString()}</span>
        )}
        {labelBottom && (
          <label className="label">
            <span className="label-text-alt">{labelBottom}</span>
          </label>
        )}
      </div>
    </>
  );
};
