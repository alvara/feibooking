interface CrossIconProps {
  isOpen: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function CrossIcon({ isOpen, className, size = 'md' }: CrossIconProps) {
  const sizeClasses = {
    sm: 'w-4 h-4', // Small size (1rem or 16px)
    md: 'w-6 h-6', // Medium size (1.5rem or 24px)
    lg: 'w-8 h-8', // Large size (2rem or 32px)
  };

  return (
    <label className="swap swap-rotate">
      <div className={`flex items-center justify-center ${className} ${sizeClasses[size]}`}>
        {isOpen ? (
          // Opened cross SVG
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 38 38"
            className={`${sizeClasses[size]} fill-current`}
            fill="none"
            stroke="#FF0099"
            strokeWidth="4"
            strokeLinecap="round"
          >
            <path d="M6 33L32.8701 6.12995" />
            <path d="M6 6L32.8701 32.8701" />
          </svg>
        ) : (
          // Closed cross SVG
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 38 38"
            className={`${sizeClasses[size]} fill-current`}
            fill="none"
            stroke="#FF0099"
            strokeWidth="4"
            strokeLinecap="round"
          >
            <line x1="20" y1="38" x2="20" y2="0" />
            <line y1="18" x2="38" y2="18" />
          </svg>
        )}
      </div>
    </label>
  );
}
