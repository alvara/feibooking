import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export function SlideDown({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
