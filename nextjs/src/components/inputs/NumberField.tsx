import type { ReactNode } from 'react';
import React from 'react';
import type { RegisterOptions, FieldValues, UseFormRegister } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import { InputLabel } from './InputLabel';

type NumberFieldValidation = Omit<
  RegisterOptions<FieldValues, string>,
  'valueAsNumber' | 'valueAsDate' | 'setValueAs'
>;

interface NumberFieldProps {
  name: string;
  placeholder?: string;
  validation?: NumberFieldValidation;
  label?: string;
  labelBottom?: string | ReactNode;
  readonly?: boolean;
  displayErrorLabel?: boolean;
  innerInputEndLabel?: ReactNode;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
}

export function NumberField({
  name,
  placeholder,
  validation,
  label,
  labelBottom,
  readonly,
  displayErrorLabel = true,
  innerInputEndLabel,
  onKeyDown,
  autoFocus = false,
}: NumberFieldProps) {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      !/[0-9]/.test(event.key) &&
      event.key !== 'Backspace' &&
      event.key !== 'ArrowLeft' &&
      event.key !== 'ArrowRight' &&
      event.key !== 'Tab' &&
      event.key !== '-'
    ) {
      event.preventDefault();
    }
    onKeyDown?.(event);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value === '' ? '' : Number(event.target.value);
    setValue(name, value, { shouldValidate: true });
  };

  const registerWithCustomValidation: UseFormRegister<FieldValues> = (field, options) => {
    return register(field, {
      ...options,
      setValueAs: (v: string) => (v === '' ? '' : Number(v)),
    });
  };

  return (
    <div className="w-full mb-4 form-control">
      {label && <InputLabel>{label}</InputLabel>}
      <div className="flex items-center">
        <div className="w-full">
          <div className="relative">
            <input
              type="number"
              placeholder={placeholder}
              {...registerWithCustomValidation(name, validation)}
              onChange={handleChange}
              readOnly={readonly}
              onKeyDown={handleKeyDown}
              disabled={readonly}
              autoFocus={autoFocus}
              className={`w-full input input-bordered h-12 ${errors[name] ? 'border-error' : ''}`}
            />
            {innerInputEndLabel && (
              <div className="absolute top-0 right-0 mt-2 mr-2">{innerInputEndLabel}</div>
            )}
          </div>
          {displayErrorLabel && errors[name] && (
            <span className="text-error label-text-alt">{errors[name]?.message?.toString()}</span>
          )}
        </div>
      </div>
      {labelBottom && (
        <label className="label">
          <span className="label-text-alt">{labelBottom}</span>
        </label>
      )}
    </div>
  );
}
