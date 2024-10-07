import type { ReactNode } from 'react';
import React from 'react';
import type { RegisterOptions } from 'react-hook-form';
import { useFormContext, Controller } from 'react-hook-form';
import { InputLabel } from './InputLabel';

interface RangeFieldProps {
  name: string;
  min: number;
  max: number;
  validation?: RegisterOptions;
  label?: string;
  labelBottom?: string | ReactNode;
  displayErrorLabel?: boolean;
}

export function RangeField({
  name,
  min,
  max,
  label,
  labelBottom,
  displayErrorLabel = true,
  validation,
}: RangeFieldProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <div className="w-full mb-4 form-control">
        {label && <InputLabel>{label}</InputLabel>}
        <div className="flex items-center">
          <div className="w-full">
            {/* Range input area */}
            <Controller
              control={control}
              name={name}
              rules={validation}
              render={({ field: { onChange, value, ...field } }) => (
                <input
                  type="range"
                  min={min}
                  max={max}
                  step="0.01"
                  value={value || 0}
                  onChange={(e) => onChange(Number(e.target.value))}
                  className={`range range-primary ${errors[name] ? 'range-error' : ''}`}
                  {...field}
                />
              )}
            />
          </div>
        </div>

        {/* Error message */}
        {displayErrorLabel && errors[name] && (
          <span className="text-error label-text-alt">{errors[name]?.message?.toString()}</span>
        )}

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
