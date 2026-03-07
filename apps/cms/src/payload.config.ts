import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { s3Storage } from '@payloadcms/storage-s3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Collections
import { Users } from './collections/Users';
import { Media } from './collections/Media';
import { Posts } from './collections/Posts';
import { Pages } from './collections/Pages';
import { Events } from './collections/Events';
import { Sponsors } from './collections/Sponsors';
import { Leaders } from './collections/Leaders';
import { GalleryItems } from './collections/GalleryItems';

// Globals
import { Home } from './globals/Home';
import { Navigation } from './globals/Navigation';
import { Footer } from './globals/Footer';
import { SiteSettings } from './globals/SiteSettings';

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || 'default-secret-change-me',
  serverURL: process.env.PUBLIC_SERVER_URL || 'http://localhost:3002',
  admin: {
    user: Users.slug,
  },
  editor: lexicalEditor({}),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  collections: [
    Users,
    Media,
    Posts,
    Pages,
    Events,
    Sponsors,
    Leaders,
    GalleryItems,
  ],
  globals: [Home, Navigation, Footer, SiteSettings],
  plugins: [
    s3Storage({
      collections: {
        media: {
          prefix: 'media',
        },
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        region: process.env.S3_REGION || 'auto',
        endpoint: process.env.S3_ENDPOINT || '',
        forcePathStyle: true,
      },
    }),
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
});
