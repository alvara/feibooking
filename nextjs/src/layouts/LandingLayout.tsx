import type { ReactElement } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { pageVariants } from '@/helpers/animationHelpers';
import type { PageOptions } from '@/types/types';
import { Modal } from '@/components/modal/Modal';
import { Navbar } from '@/features/global/Navbar';
import { Footer } from '@/features/global/Footer';

function Layout({ children }: { children: React.ReactNode; pageOptions?: PageOptions }) {
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col justify-between min-h-screen bg-white">
        <Navbar />

        <AnimatePresence mode="wait">
          <motion.main
            key={router.route}
            initial="pageInitial"
            animate="pageAnimate"
            exit="pageExit"
            variants={pageVariants}
            className="grow contents"
          >
            {children}
          </motion.main>
        </AnimatePresence>
        <Footer />
        <Modal />
      </div>
    </>
  );
}

function LandingLayout(page: ReactElement, pageOptions?: PageOptions): ReactElement {
  return <Layout pageOptions={pageOptions}>{page}</Layout>;
}

export default LandingLayout;
