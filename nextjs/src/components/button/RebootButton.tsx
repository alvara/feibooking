import Link from 'next/link';
import type { CSSProperties } from 'react';
import { useEffect, useRef, useState } from 'react';

interface RebootButtonProps {
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
  callbackUrl?: string;
}

function getButtonSize(size: string, variant: string) {
  if (variant === 'text') return 'px-0 py-0';

  switch (size) {
    case 'xs':
      return 'px-2 py-1';
    case 'sm':
      return 'px-3 py-2';
    case 'md':
      return 'px-4 py-2';
    case 'lg':
      return 'px-5 py-3';
    case 'xl':
      return 'px-6 py-4';
    default:
      return 'px-3 py-1';
  }
}

function getVariantClasses(variant: string, color: string, disabled: boolean) {
  /**
   * DISABLED VARIANT (OVERWRITES ALL OTHER VARIANTS)
   */
  if (disabled) {
    return 'text-white bg-gray-100 bg-gray-400 ';
  } else {
    switch (variant) {
      /**
       * CONTAINED VARIANT
       */
      case 'contained':
        switch (color) {
          case 'primary':
            return 'border border-primary text-white bg-primary hover:bg-primary-highlight hover:border-bg-primary-highlight';
          case 'secondary':
            return 'text-white bg-secondary hover:bg-secondary-highlight';
          case 'tertiary':
            return 'border text-white border-bg-tertiary bg-tertiary hover:bg-tertiary-highlight hover:border-bg-tertiary-highlight';
          case 'gray':
            return 'border bg-gray-lighter hover:bg-gray-light border-gray';
          case 'unavailable':
            return 'text-white bg-gray-100 bg-gray-400 hover:text-body1';
          case 'disabled':
            return 'text-white bg-gray-100 bg-gray-400 hover:text-body1';
          default:
            return 'text-white bg-base-200 hover:bg-base-300';
        }

      /**
       * OUTLINE VARIANT
       */

      case 'outline':
        switch (color) {
          case 'primary':
            return 'border-primary border-2 bg-transparent text-primary hover:shadow ';
          case 'secondary':
            return 'border-secondary border-2 bg-transparent text-secondary hover:shadow ';
          case 'tertiary':
            return 'border-tertiary border-2 bg-transparent text-tertiary hover:shadow ';
          case 'gray':
            return 'border-gray border-2 bg-transparent text-body1 hover:shadow hover:border-primary  hover:text-primary';
          case 'unavailable':
            return 'border-gray border-2 bg-transparent text-gray hover:text-body1 hover:shadow';
          default:
            return 'border-default border-2 bg-transparent text-default ';
        }

      /**
       * TEXT VARIANT
       */
      case 'text':
        switch (color) {
          case 'primary':
            return 'text-primary bg-transparent border-none';
          case 'secondary':
            return 'text-secondary bg-transparent border-none';
          case 'tertiary':
            return 'text-tertiary  bg-transparent border-none';
          case 'gray':
            return 'text-gray bg-transparent border-none';
          default:
            return 'text-default  bg-transparent border-none';
        }

      default:
        return '';
    }
  }
}

export function RebootButton({
  children,
  href,
  callbackUrl,
  color = 'primary',
  type = 'button',
  size = 'md',
  className = '',
  style,
  variant = 'contained',
  onClick: onclick,
  isLoading = false,
  hasMinWidth = true,
  disabled = false,
}: RebootButtonProps) {
  const sizeClasses = getButtonSize(size, variant);
  const variantClasses = getVariantClasses(variant, color, disabled);
  const contentRef = useRef<HTMLSpanElement>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [constructedUrl, setConstructedUrl] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && href) {
      const url = new URL(href, window.location.origin);
      if (callbackUrl) {
        url.searchParams.append('callback', callbackUrl);
      }
      setConstructedUrl(url.toString());
    } else {
      setConstructedUrl(null);
    }
  }, [href, callbackUrl]);

  // set button width to content width
  useEffect(() => {
    if (contentRef.current && !isLoading) {
      setContentWidth(contentRef.current.offsetWidth);
      setContentHeight(contentRef.current.offsetHeight);
    }
  }, [isLoading]);

  const buttonClasses = `no-underline flex inline-flex align-middle items-center justify-center gap-2 transition-all rounded-se-none rounded-es-none rounded-xl  ${sizeClasses} ${variantClasses} ${className} ${
    hasMinWidth ? 'min-w-[8rem]' : ''
  }`;

  const buttonContent = (
    <span
      ref={!isLoading ? contentRef : null}
      className="flex items-center justify-center py-1 leading-none"
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

  if (type === 'submit' || !constructedUrl) {
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
    <Link href={constructedUrl} className="no-underline">
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
