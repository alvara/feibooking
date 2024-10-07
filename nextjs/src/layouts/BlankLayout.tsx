import type { ReactElement } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { pageVariants } from '@/helpers/animationHelpers';
import type { PageOptions } from '@/types/types';
// import useProcessUTMParameters from '@/hooks/useProcessUTMParameters';
// import useFingerprint from '@/hooks/useFingerprint';

function Layout({ children }: { children: React.ReactNode; pageOptions?: PageOptions }) {
  const router = useRouter();

  // useProcessUTMParameters();
  // useFingerprint();

  return (
    <>
      <div className="flex flex-col justify-between min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={router.route}
            initial="pageInitial"
            animate="pageAnimate"
            exit="pageExit"
            variants={pageVariants}
          >
            <main>
              <div className="contents">{children}</div>
            </main>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}

function BlankLayout(page: ReactElement, pageOptions?: PageOptions): ReactElement {
  return <Layout pageOptions={pageOptions}>{page}</Layout>;
}

export default BlankLayout;
