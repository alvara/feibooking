import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconChevronUp } from '@tabler/icons-react';

export function ScrollTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const checkScroll = () => {
    setIsVisible(window.scrollY > window.innerHeight * 0.9);
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="z-50 flex items-center justify-center p-3 leading-none bg-white border rounded-full cursor-pointer"
          onClick={scrollToTop}
        >
          <IconChevronUp size={28} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
