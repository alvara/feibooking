import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import type { ComponentType } from 'react';
import { MotionFadeInUpOnce } from '../animation/MotionFadeInUpOnce';
interface SliderProps<T, V> {
  title?: string;
  data: T[];
  cardComponent: ComponentType<{
    data: T;
    variant?: V;
    preview?: boolean;
  }>;
  buttonUrl?: string;
  buttonText?: string;
  id: string;
  enableScrollbar?: boolean;
  variant?: V;
  preview?: boolean;
}

export function Slider<T, V>({
  title,
  data,
  cardComponent: CardComponent,
  buttonUrl,
  // TODO: replace with i18n later
  buttonText = 'View All',
  id,
  enableScrollbar,
  variant,
  preview = true,
}: SliderProps<T, V>) {
  const carouselVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  const scrollbarStyles = 'py-4 scrollbar';

  return (
    <MotionFadeInUpOnce>
      <motion.div id={id} initial="hidden" animate="visible" variants={carouselVariants}>
        <div className="mb-0">
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
              id="carousel"
              // TODO: replace scrollbar with buttons in sliders
              className={`flex w-full gap-4 overflow-x-scroll pb-4 justify-between ${
                enableScrollbar ? scrollbarStyles : 'scrollbar-hide'
              }`}
            >
              <AnimatePresence>
                {data.map((item, index) => (
                  <CardComponent key={index} data={item} variant={variant} preview={preview} />
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </MotionFadeInUpOnce>
  );
}
