// Utility function to convert file to Base64
export const getBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

// validate file size to be only 10mb
export const isFileSizeValid = (file: File) => {
  const maxSizeInBytes = 10 * 1024 * 1024; // 10MB
  return file.size <= maxSizeInBytes;
};
