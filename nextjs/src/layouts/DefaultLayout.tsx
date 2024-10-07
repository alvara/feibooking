import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { BottomNavBar } from '@/features/global/BottomNavbar';
import { Toaster } from '@/components/ui/toaster';
import { pageVariants } from '@/components/animation/pageVariants';
import { Navbar } from '@/features/global/Navbar';
import { Footer } from '@/features/global/Footer';

interface PageOptions {
  title?: string;
  useBackButton?: boolean;
  rightNavMenu?: ReactNode;
}

export function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
  pageOptions?: PageOptions;
}) {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto">
        <Navbar />
      </div>

      <div className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.main
            key={router.route}
            initial="pageInitial"
            animate="pageAnimate"
            exit="pageExit"
            variants={pageVariants}
            className="w-full"
          >
            {children}
          </motion.main>
        </AnimatePresence>
      </div>
      <Footer />

      <BottomNavBar />

      <Toaster />
    </div>
  );
}
