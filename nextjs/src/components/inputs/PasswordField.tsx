import React, { useState } from 'react';
import type { RegisterOptions } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import { InputLabel } from './InputLabel';
import { IconEye, IconEyeOff } from '@tabler/icons-react';

interface PasswordFieldProps {
  name: string;
  placeholder?: string;
  validation?: RegisterOptions;
  label?: string;
  labelBottom?: string | React.ReactNode;
  displayErrorLabel?: boolean;
  autoFocus?: boolean;
}

export function PasswordField({
  name,
  placeholder,
  validation,
  label,
  labelBottom,
  displayErrorLabel = true,
  autoFocus = false,
}: PasswordFieldProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <>
      <div className="w-full mb-4 form-control">
        {label && <InputLabel>{label}</InputLabel>}
        <div className="flex items-center">
          <div className="w-full">
            <div className="relative">
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder={placeholder}
                {...register(name, validation)}
                autoFocus={autoFocus}
                className={`w-full input input-bordered h-12 ${errors[name] ? 'border-error' : ''}`}
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {isPasswordVisible ? <IconEyeOff size={24} /> : <IconEye size={24} />}
              </div>
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
    </>
  );
}
