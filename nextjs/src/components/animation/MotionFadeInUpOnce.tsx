import { motion } from 'framer-motion';

const slowVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const fastVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function MotionFadeInUpOnce({
  children,
  className,
  variant = 'slow',
}: {
  children: React.ReactNode;
  className?: string;
  variant?: 'slow' | 'fast';
}) {
  const selectVariant = () => {
    switch (variant) {
      case 'fast':
        return fastVariant;
      case 'slow':
        return slowVariant;
      default:
        return slowVariant;
    }
  };

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={selectVariant()}
      className={className}
    >
      {children}
    </motion.span>
  );
}
