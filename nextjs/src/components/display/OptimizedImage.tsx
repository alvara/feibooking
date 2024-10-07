import { cn } from '@/lib/utils';

import { useState } from 'react';

export const OptimizedImage = ({
  src,
  alt,
  className,
  style,
}: {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && <div className={cn('absolute top-0 left-0 skeleton h-full w-full')}></div>}
      <img
        src={src}
        alt={alt}
        className={className}
        style={{
          ...style,
          display: isLoaded ? 'block' : 'none', // Ensure the image is only visible when loaded
        }}
        onLoad={() => setIsLoaded(true)} // This will be triggered when the image is loaded
      />
    </>
  );
};
