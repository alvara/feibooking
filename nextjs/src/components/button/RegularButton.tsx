import Link from 'next/link';
import type { CSSProperties } from 'react';
import { useEffect, useRef, useState } from 'react';

interface RegularButtonProps {
  children: React.ReactNode;
  href?: string;
  color?: 'primary' | 'secondary' | 'tertiary' | 'gray';
  type?: 'button' | 'submit' | 'reset';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  style?: CSSProperties;
  variant?: 'contained' | 'outline' | 'text';
  onClick?: () => void;
  isLoading?: boolean;
  hasMinWidth?: boolean;
  disabled?: boolean;
}

export function RegularButton({
  children,
  href,
  type = 'button',
  style,
  onClick: onclick,
  isLoading = false,
  hasMinWidth = true,
  disabled = false,
}: RegularButtonProps) {
  const contentRef = useRef<HTMLSpanElement>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);

  // set button width to content width
  useEffect(() => {
    if (contentRef.current && !isLoading) {
      setContentWidth(contentRef.current.offsetWidth);
      setContentHeight(contentRef.current.offsetHeight);
    }
  }, [isLoading]);

  const buttonClasses = `btn ${hasMinWidth ? 'min-w-[8rem]' : ''}`;

  const buttonContent = (
    <span
      ref={!isLoading ? contentRef : null}
      className="flex items-center justify-center leading-tight"
      style={
        isLoading
          ? {
              width: `${contentWidth}px`,
              height: `${contentHeight}px`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }
          : {}
      }
    >
      {isLoading ? <span className="loading loading-spinner loading-xs"></span> : children}
    </span>
  );

  if (type === 'submit' || !href) {
    return (
      <button
        type={type}
        className={buttonClasses}
        style={style}
        onClick={onclick}
        disabled={disabled || isLoading}
      >
        {buttonContent}
      </button>
    );
  }

  return (
    <Link href={href} className="no-underline ">
      <button
        type={type}
        className={buttonClasses}
        style={style}
        onClick={onclick}
        disabled={disabled || isLoading}
      >
        {buttonContent}
      </button>
    </Link>
  );
}
