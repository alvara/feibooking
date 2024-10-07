import { IconCloudUpload } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import type { FieldValues, UseFormRegisterReturn, UseFormSetError } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import { getBase64, isFileSizeValid } from '@/helpers/fileHelpers';

interface FileDropZoneFieldProps {
  acceptedFileTypes?: string;
  register: UseFormRegisterReturn;
  setError: UseFormSetError<FieldValues>;
}

export function FileDropZoneField({
  acceptedFileTypes = 'image/*',
  register,
  setError,
}: FileDropZoneFieldProps) {
  const {
    setValue,
    watch,
    formState: { errors },
    clearErrors,
  } = useFormContext();
  const fileValue = watch(register.name);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  // Set preview on mount if file already exists
  useEffect(() => {
    if (fileValue && fileValue.url) {
      // TODO: migrate to s3 bucket url
      setFilePreview(process.env.NEXT_PUBLIC_BACKEND_API_URL + fileValue.url);
    }
  }, [fileValue]);

  // Set the file preview when the file changes
  useEffect(() => {
    if (fileValue && fileValue.length > 0) {
      const file = fileValue[0];
      getBase64(file)
        .then((base64) => setFilePreview(base64))
        .catch((error) => {
          console.error('Error converting file to base64', error);
          setFilePreview(null);
        });
    }
  }, [fileValue]);

  // Handles file input changes and drops
  const handleFiles = async (files: FileList) => {
    if (files.length === 0) {
      setValue(register.name, null);
      setFilePreview(null);
      clearErrors(register.name);
      return;
    }

    const file = files[0];

    // check if file size exceeds the size limit
    if (!isFileSizeValid(file)) {
      setError(register.name, {
        type: 'manual',
        message: 'File size exceeds the limit.',
      });
      return;
    }

    // check if file name exceeds 100 characters
    if (file.name.length > 100) {
      setError(register.name, {
        type: 'manual',
        message: "File name can't exceed 100 characters.",
      });
      return; // Exit the function if the validation fails
    }

    // check if file is a vali type of image
    if (!file.type.startsWith('image')) {
      setError(register.name, {
        type: 'manual',
        message: 'Please upload a valid image file',
      });
      return;
    }

    // If the file is valid, set it to the form and update the preview
    setValue(register.name, file, { shouldValidate: true });
    const base64 = await getBase64(file);
    setFilePreview(base64); // Use base64 for the preview
    clearErrors(register.name);
  };

  const handleRemoveFile = () => {
    setValue(register.name, null, {
      shouldValidate: true,
    }); // Clear the file input
    setFilePreview(null); // Reset the file preview
    clearErrors(register.name);
  };

  return (
    <div className="mb-4">
      {!filePreview ? (
        <div
          className={`flex items-center justify-center p-6 border-2 ${
            errors[register.name] ? 'border-red-500' : 'border-gray-300'
          } border-dashed rounded-lg cursor-pointer`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFiles(e.dataTransfer.files);
          }}
        >
          <div className="text-center">
            {errors[register.name] && (
              <p className="mb-2 text-red-500">
                <>{errors[register.name]?.message}</>
              </p>
            )}
            <input
              id={`${register.name}-file-upload`}
              type="file"
              className="sr-only"
              accept={acceptedFileTypes}
              {...register}
              onChange={(e) => {
                if (e.target.files !== null) {
                  handleFiles(e.target.files);
                }
              }}
            />

            <label
              htmlFor={`${register.name}-file-upload`}
              className="relative flex flex-col items-center w-full rounded-md cursor-pointer text-gray"
            >
              <IconCloudUpload size="60" />
              <span>Drag and drop</span>
              <p>or</p>
              <button
                type="button"
                color="secondary"
                onClick={() => document.getElementById(`${register.name}-file-upload`)?.click()}
              >
                Upload File
              </button>
            </label>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-start justify-between gap-4 p-4 mt-4 rounded-lg ">
          <img src={filePreview} alt="File Preview" className="w-full max-h-40 object-contain" />
          {fileValue?.name}
          <button onClick={handleRemoveFile}>Remove file</button>
        </div>
      )}
    </div>
  );
}
