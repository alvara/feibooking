import { cn } from '@/lib/utils';
import useTranslation from 'next-translate/useTranslation';

export function BrandLogo({
  className,
  showText = true,
  textPosition = 'side',
  textClassName = '',
}: {
  className?: string;
  showText?: boolean;
  textPosition?: 'side' | 'bottom';
  textClassName?: string;
}) {
  const { t } = useTranslation('common');

  return (
    <div
      className={cn(
        textPosition === 'side' ? 'flex items-center' : 'flex flex-col items-center',
        className,
      )}
    >
      <img
        src={'/logos/fit-festival-logo-wider.png'}
        alt={t('brandName')}
        className={cn('w-auto h-10', textPosition === 'side' && showText && 'mr-1')}
      />
      {showText && (
        <span
          className={cn(
            'whitespace-nowrap text-xl font-normal font-boston leading-none',
            textPosition === 'bottom' && 'mt-1',
            textClassName,
          )}
        >
          {t('brandName')}
        </span>
      )}
    </div>
  );
}
