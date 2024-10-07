import Head from 'next/head';

export function PageHead({ pageTitle }: { pageTitle: string }) {
  return (
    <Head>
      <title>{pageTitle}</title>
    </Head>
  );
}
