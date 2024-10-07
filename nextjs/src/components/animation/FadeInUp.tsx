import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';
import { fadeInFromBottomVariant } from './fadeInFromBottomVariant';

export function FadeInUp({ children, className }: { children: ReactNode; className?: string }) {
  const [ref, inView] = useInView({
    threshold: 0.01,
    triggerOnce: false,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={fadeInFromBottomVariant}
      className={className}
    >
      {children}
    </motion.div>
  );
}
