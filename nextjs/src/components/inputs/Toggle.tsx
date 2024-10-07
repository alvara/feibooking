import React from 'react';
import type { RegisterOptions, UseFormRegisterReturn } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import { InputLabel } from './InputLabel';

interface ToggleProps {
  register: UseFormRegisterReturn;
  placeholder?: string;
  validation?: RegisterOptions;
  label?: string;
  labelBottom?: string | React.ReactNode;
  icon?: string;
  onClick?: () => void;
}

export function Toggle({ register, placeholder, label, labelBottom, icon, onClick }: ToggleProps) {
  const {
    formState: { errors },
    watch,
  } = useFormContext();
  const fieldName = register.name;
  const isChecked = watch(fieldName);

  return (
    <>
      <div className="w-full form-control">
        <div className="flex items-center justify-between">
          {label && <InputLabel>{label}</InputLabel>}
          {icon && (
            <img
              className="w-[3rem] max-h-[3rem] object-contain mr-8"
              src={icon}
              alt="input icon"
            />
          )}
          <input
            type="checkbox"
            placeholder={placeholder}
            {...register}
            checked={isChecked === true}
            onClick={onClick}
            className={`toggle toggle-primary [--tglbg:#F1F1F1] ${
              errors[fieldName] ? 'border-red-500' : ''
            }`}
          />
        </div>
        {errors[fieldName] && (
          <span className="text-red-500 label-text-alt">
            {errors[fieldName]?.message as React.ReactNode}
          </span>
        )}
        <label className="label">
          {labelBottom && <span className="label-text-alt">{labelBottom}</span>}
        </label>
      </div>
    </>
  );
}
