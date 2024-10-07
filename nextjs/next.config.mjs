import nextTranslate from 'next-translate-plugin';
import TerserPlugin from 'terser-webpack-plugin';

const isProd = process.env.NODE_ENV === 'production';

// const sentryWebpackPluginOptions = {
// Additional config options for the Sentry webpack plugin. Keep in mind that
// the following options are set automatically, and overriding them is not
// recommended:
//   release, url, configFile, stripPrefix, urlPrefix, include, ignore
// org: 'example-org',
// project: 'example-project',
// An auth token is required for uploading source maps.
// authToken: process.env.SENTRY_AUTH_TOKEN,
// silent: true, // Suppresses all logs
// For all available options, see:
// https://github.com/getsentry/sentry-webpack-plugin#options.
// };

const nextConfig = nextTranslate({
  // expose next-translate jsons as unique url
  // needed when deployed so middleware utm parameters only set once per page
  // skipMiddlewareUrlNormalize: true,
  i18n: {
    locales: ['en', 'ja'],
    defaultLocale: 'en',
    localeDetection: false,
  },
  trailingSlash: true,
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // insure robots.txt and sitemap.xml are not bundled in the server
    if (isServer) {
      config.externals.push('robots.txt', 'sitemap.xml');
    }

    config.optimization.minimize = isProd;
    config.optimization.minimizer = [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: isProd,
          },
        },
        extractComments: 'all',
      }),
    ];

    // add SVG support
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakeimg.pl',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'd39jyigt3xg3lw.cloudfront.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
    ],
  },
});

export default nextConfig;
