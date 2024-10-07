import React from 'react';
import { useFormContext } from 'react-hook-form';
import { InputLabel } from './InputLabel';

interface TextFieldPostalCodeProps {
  registerName: string;
  label?: string;
  labelBottom?: string | React.ReactNode;
  placeholder?: string;
  className?: string;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export function TextFieldPostalCode({
  registerName,
  label,
  labelBottom,
  placeholder,
  className,
  onKeyDown,
}: TextFieldPostalCodeProps) {
  const {
    register,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext();

  const formatPostalCode = (value: string) => {
    const numbers = value.replace(/[^\d]/g, '');
    const part1 = numbers.slice(0, 3);
    const part2 = numbers.slice(3, 7);
    return `${part1}${part2 ? '-' : ''}${part2}`.trim() || '';
  };

  const handleBlur = () => {
    trigger(registerName);
  };

  const handlePostalCodeInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Default to the end of the input value if selectionStart is null
    const selectionStart = event.target.selectionStart ?? event.target.value.length;
    const inputNumbersValue = event.target.value.replace(/\D/g, '');
    const formattedValue = formatPostalCode(inputNumbersValue);
    setValue(registerName, inputNumbersValue, { shouldValidate: false });
    event.target.value = formattedValue;
    const newSelectionStart = selectionStart + (formattedValue.length - inputNumbersValue.length);
    setTimeout(() => event.target?.setSelectionRange(newSelectionStart, newSelectionStart), 0);
  };

  return (
    <div className={`w-full mb-4 form-control ${className}`}>
      {label && <InputLabel>{label}</InputLabel>}
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          {...register(registerName, {
            required: 'Postal code is required',
            pattern: {
              value: /^\d{3}-\d{4}$/,
              message: 'Postal code must be in the format: xxx-xxxx',
            },
            onBlur: handleBlur,
            onChange: handlePostalCodeInputChange,
          })}
          onKeyDown={onKeyDown}
          className={`w-full input input-bordered h-12 ${errors[registerName] ? 'border-error' : ''}`}
        />
        {errors[registerName] && (
          <span className="text-error label-text-alt">
            {errors[registerName]?.message?.toString()}
          </span>
        )}
      </div>
      {labelBottom && (
        <label className="label">
          <span className="label-text-alt">{labelBottom}</span>
        </label>
      )}
    </div>
  );
}
