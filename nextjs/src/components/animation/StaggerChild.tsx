import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export function StaggerChild({ children, ...props }: { children: ReactNode }) {
  return (
    <motion.div variants={childVariants} {...props}>
      {children}
    </motion.div>
  );
}
