import { motion } from 'framer-motion';
import Link from 'next/link';
import type { ComponentType } from 'react';

interface GridProps<T, V> {
  title?: string;
  data: T[];
  cardComponent: ComponentType<{
    data: T;
    variant?: V;
    preview?: boolean;
  }>;
  id: string;
  buttonUrl?: string;
  buttonText?: string;
  variant?: V;
  mobileColumns?: 1 | 2 | 3 | 4 | 5;
  tabletColumns?: 1 | 2 | 3 | 4 | 5;
  desktopColumns?: 1 | 2 | 3 | 4 | 5;
  preview?: boolean;
}

export function Grid<T, V>({
  title,
  data,
  cardComponent: CardComponent,
  buttonUrl,
  buttonText = 'See More',
  id,
  variant,
  mobileColumns = 1,
  tabletColumns = 2,
  desktopColumns = 4,
  preview = true,
}: GridProps<T, V>) {
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  function getMobileColumns(mobileColumns?: 1 | 2 | 3 | 4 | 5): string {
    switch (mobileColumns) {
      case 1:
        return 'grid-cols-1';
      case 2:
        return 'grid-cols-2';
      case 3:
        return 'grid-cols-3';
      case 4:
        return 'grid-cols-4';
      case 5:
        return 'grid-cols-5';
      default:
        return 'grid-cols-2';
    }
  }

  function getTabletColumns(tabletColumns?: 1 | 2 | 3 | 4 | 5): string {
    switch (tabletColumns) {
      case 1:
        return 'sm:grid-cols-1';
      case 2:
        return 'sm:grid-cols-2';
      case 3:
        return 'sm:grid-cols-3';
      case 4:
        return 'sm:grid-cols-4';
      case 5:
        return 'sm:grid-cols-5';
      default:
        return 'sm:grid-cols-3';
    }
  }

  function getDesktopColumns(desktopColumns?: 1 | 2 | 3 | 4 | 5): string {
    switch (desktopColumns) {
      case 1:
        return 'md:grid-cols-1';
      case 2:
        return 'md:grid-cols-2';
      case 3:
        return 'md:grid-cols-3';
      case 4:
        return 'md:grid-cols-4';
      case 5:
        return 'md:grid-cols-5';
      default:
        return 'md:grid-cols-4';
    }
  }

  return (
    <>
      <motion.div id={id} initial="hidden" animate="visible" variants={gridVariants}>
        <div>
          <div className="relative">
            <div className="relative flex items-center w-full gap-4 mb-4">
              <div className="w-full">
                {title && (
                  <h2>
                    <span>{title}</span>
                  </h2>
                )}
              </div>

              {/* needs title to align button properly */}
              {title && buttonUrl && buttonText && (
                <Link href={buttonUrl} className=" min-w-fit">
                  {buttonText}
                </Link>
              )}
            </div>
            <div
              className={`grid gap-x-4 gap-y-8 
              ${getMobileColumns(mobileColumns)} 
              ${getTabletColumns(tabletColumns)} 
              ${getDesktopColumns(desktopColumns)} 
              `}
            >
              {data.map((item, index) => (
                <CardComponent key={index} data={item} variant={variant} preview={preview} />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
