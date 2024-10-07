import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export function StaggerParent({ children }: { children: ReactNode }) {
  const containerVariants = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.35,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <motion.section
      className="w-full h-full sm:px-[4rem] lg:px-[8rem] p-2 xs:px-12 "
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {children}
    </motion.section>
  );
}
