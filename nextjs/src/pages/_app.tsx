import '@/style/tailwind-init.css';
import '@/style/customFonts.css';
import { inter, notoSansJp, notoSansThai } from '@/style/GoogleFonts';

import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DefaultLayout } from '@/layouts/DefaultLayout';
import { useEffect } from 'react';
import { getSystemLanguage } from '@/helpers/getSystemLanguage';
import type { AppPropsWithLayout } from '@/types/types';

const queryClient = new QueryClient();

function MyApp(props: AppPropsWithLayout) {
  const { Component, pageProps, session } = props;
  const router = useRouter();

  useEffect(() => {
    const storedLang = localStorage.getItem('preferredLanguage');
    const targetLang = storedLang || getSystemLanguage();

    if (targetLang !== router.locale) {
      router.replace(router.asPath, undefined, { locale: targetLang, scroll: false });
    }
  }, [router]);

  const getLayout = Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{`Fit Festivals ${router.pathname}`}</title>
      </Head>

      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <div
            className={`font-sans ${inter.variable} ${notoSansJp.variable} ${notoSansThai.variable}`}
          >
            {getLayout(<Component {...pageProps} />)}
          </div>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
