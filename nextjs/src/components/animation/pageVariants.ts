export const pageVariants = {
  pageInitial: {
    opacity: 0,
  },
  pageAnimate: {
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeInOut' },
  },
  pageExit: {
    opacity: 0,
    transition: { duration: 0, ease: 'easeInOut' },
  },
};
