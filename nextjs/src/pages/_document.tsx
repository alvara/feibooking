import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    const metaUrl = 'https://www.reboot-japan.com/';
    const metaDescription =
      'あこがれの最新デバイスをお値頃価格で。リーズナブルな価格と、自由な契約期間でサブスクできます。最新デバイスを気軽にサブスクして、デジタル・ライフを"リブート"しましょう！	';

    return (
      <Html lang="en">
        {/* Head for global on all pages (not to be confused with PageHead for individual page changes) */}
        <Head>
          {/* PWA primary color */}
          <meta name="theme-color" content="" />
          <meta name="description" content={metaDescription} />

          {/* favicons */}
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />

          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`${metaUrl}/`} />
          <meta property="og:title" content={metaDescription} />
          <meta property="og:description" content={metaDescription} />
          <meta property="og:image" content={`${metaUrl}/ogp.png`} />

          {/*Twitter*/}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content={`${metaUrl}/`} />
          <meta property="twitter:title" content={metaDescription} />
          <meta property="twitter:description" content={metaDescription} />
          <meta property="twitter:image" content={`${metaUrl}/ogp.png`} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (context) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  return await Document.getInitialProps(context);
};
