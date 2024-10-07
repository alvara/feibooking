import React, { useState } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import { InputLabel } from './InputLabel';

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label?: string;
  register: UseFormRegisterReturn;
  options?: Option[];
  placeholder?: string;
  labelBottom?: string;
  icon?: string;
}

export function SelectField({
  label,
  register,
  options,
  placeholder,
  labelBottom,
  icon,
}: SelectFieldProps) {
  const [, setSelectedValue] = useState<string>('');
  const {
    formState: { errors },
  } = useFormContext();
  const fieldName = register.name;

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);

    // If register provides an onChange, call that too
    register.onChange && register.onChange(e);
  };

  return (
    <div className="w-full form-control">
      {label && <InputLabel>{label}</InputLabel>}
      <div className="flex items-center">
        {icon && (
          <img
            className="w-[3.3rem] max-h-[3rem] object-contain mr-8"
            src={icon}
            alt="select icon"
          />
        )}
        <div className="flex flex-col w-full justify-stretch">
          <select
            {...register}
            onChange={handleSelectChange}
            className={`bg-white select-bordered select border-gray-darkest w-full ${
              errors[fieldName] ? 'border-red-500' : ''
            }`}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors[fieldName] && (
            <div className="mt-2 text-red-500 label-text-alt">
              <>{errors[fieldName]?.message}</>
            </div>
          )}
        </div>
      </div>
      <label className="label">
        {labelBottom && <span className="label-text-alt">{labelBottom}</span>}
      </label>
    </div>
  );
}
