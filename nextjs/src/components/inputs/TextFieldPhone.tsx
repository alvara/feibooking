import React from 'react';
import type { RegisterOptions } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import { InputLabel } from './InputLabel';

interface TextFieldPhoneProps {
  registerName: string;
  type?: string;
  placeholder?: string;
  label?: string;
  labelBottom?: string | React.ReactNode;
  readonly?: boolean;
  autoFocus?: boolean;
}

export function TextFieldPhone({
  registerName,
  type = 'tel',
  placeholder,
  label,
  labelBottom,
  readonly,
  autoFocus = false,
}: TextFieldPhoneProps) {
  const {
    register,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext();

  const formatPhoneNumber = (value: string): string => {
    const numbers = value.replace(/[^\d]/g, '');
    const part1 = numbers.slice(0, 3);
    const part2 = numbers.slice(3, 7);
    const part3 = numbers.slice(7, 11);
    return `${part1}${part2 ? '-' : ''}${part2}${part3 ? '-' : ''}${part3}`.trim();
  };

  const handleBlur = () => {
    trigger(registerName);
  };

  const handlePhoneInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Use nullish coalescing operator to provide a fallback value of 0
    const selectionStart = event.target.selectionStart ?? 0;
    const inputNumbersValue = event.target.value.replace(/\D/g, '');
    const formattedValue = formatPhoneNumber(inputNumbersValue);
    setValue(registerName, formattedValue, { shouldValidate: true });

    const newSelectionStart = selectionStart + (formattedValue.length - inputNumbersValue.length);
    setTimeout(() => event.target.setSelectionRange(newSelectionStart, newSelectionStart), 0);
  };

  const validation: RegisterOptions = {
    required: 'Mobile phone number is required',
    pattern: {
      value: /^\d{3}-\d{4}-\d{4}$/,
      message: 'Phone number must be in the format: xxx-xxxx-xxxx',
    },
    onBlur: handleBlur,
    onChange: handlePhoneInputChange,
  };

  return (
    <>
      <div className="w-full mb-4 form-control">
        {label && <InputLabel>{label}</InputLabel>}
        <div className="flex items-center">
          <div className="w-full">
            <div className="relative">
              <input
                type={type}
                placeholder={placeholder}
                {...register(registerName, validation)}
                readOnly={readonly}
                disabled={readonly}
                autoFocus={autoFocus}
                className={`w-full input input-bordered h-12 ${errors[registerName] ? 'border-error' : ''}`}
              />
            </div>
            <span>
              {errors[registerName] && (
                <span className="text-error label-text-alt">
                  {errors[registerName]?.message?.toString()}
                </span>
              )}
            </span>
          </div>
        </div>
        {labelBottom && (
          <label className="label">
            <span className="label-text-alt">{labelBottom}</span>
          </label>
        )}
      </div>
    </>
  );
}
