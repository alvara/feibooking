import './tailwind.css';
import path from 'path';
import { payloadCloud } from '@payloadcms/plugin-cloud';
import { cloudStorage } from '@payloadcms/plugin-cloud-storage';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { webpackBundler } from '@payloadcms/bundler-webpack';
import { slateEditor } from '@payloadcms/richtext-slate';
import { buildConfig } from 'payload/config';
import { Users } from './collections/UsersCollection';
import { swagger } from 'payload-swagger';
import { SmallLogo } from './components/graphics/SmallLogo';
import { Logo } from './components/graphics/Logo';
import { Communities } from './collections/CommunitiesCollection';
import { Events } from './collections/eventsCollection';
import { s3Adapter } from '@payloadcms/plugin-cloud-storage/s3';
import { ImageUploads } from './collections/ImageUploadsCollection';

const adapter = s3Adapter({
  config: {
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
    region: process.env.S3_REGION,
  },
  bucket: process.env.S3_BUCKET,
});

const plugins = [
  payloadCloud(),
  cloudStorage({
    collections: {
      imageUploads: {
        adapter: adapter,
      },
    },
  }),
];

if (process.env.NODE_ENV !== 'production') {
  plugins.unshift(swagger({}));
}

export default buildConfig({
  // IMPORTANT: cors option wasnt working here, so now handled in server.ts
  // cors: ["*"],

  // csrf: ["localhost:3000"],
  rateLimit: {
    skip: () => process.env.NODE_ENV === 'development',
  },
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    webpack: (config) => {
      return {
        ...config,
        module: {
          ...config.module,
          rules: [
            ...config.module.rules,
            {
              test: /\tailwind.css$/i,
              use: ['css-loader', 'postcss-loader'],
            },
          ],
        },
      };
    },
    css: path.resolve(__dirname, './styles/main.scss'),
    meta: {
      favicon: '/assets/favicon.ico',
      titleSuffix: '・Fit Festivals',
    },
    components: {
      // providers: [PayloadReactQueryProvider, PayloadProfileProvider],
      // custom navigation
      // beforeNavLinks: [NavProfileSwitcher],
      // Nav: NavWrapper,
      graphics: {
        Icon: SmallLogo,
        Logo: Logo,
      },

      views: {
        // Dashboard: CustomDashboardView,
      },
    },
  },
  // cors: ["http://localhost:3001", "*"],
  editor: slateEditor({}),
  collections: [Communities, Events, Users, ImageUploads],
  localization: {
    locales: ['en', 'ja'],
    defaultLocale: 'en',
    fallback: true,
  },
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: plugins,
  db: mongooseAdapter({
    url: process.env.MONGO_SERVER_URL,
    connectOptions: {
      appName: process.env.MONGO_APP_NAME,
      dbName: process.env.MONGO_DB_NAME,
    },
  }),
});
