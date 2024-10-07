import { defineConfig } from 'orval';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
console.log('Backend URL:', backendUrl);

export default defineConfig({
  'payload-api': {
    input: {
      target: `${backendUrl}/api-docs/specs`,
      validation: false,
    },
    output: {
      mode: 'tags',
      target: 'src/api/payload-client',
      schemas: 'src/api/payload-client/model',
      client: 'react-query',
      baseUrl: `${backendUrl}/api`,
      mock: false,
    },
    hooks: {
      afterAllFilesWrite: 'prettier --write',
    },
  },
});
