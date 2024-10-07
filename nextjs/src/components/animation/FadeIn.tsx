import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { fadeInVariants } from './fadeInVariants';
import type { ReactNode } from 'react';

export function FadeIn({ children }: { children: ReactNode }) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={fadeInVariants}
    >
      {children}
    </motion.div>
  );
}
