/** Typed environment variable access with defaults for CMS and web apps. */
export function getEnv(key: string, fallback = ''): string {
  return process.env[key] ?? fallback;
}

/** CMS server configuration from environment variables. */
export const cmsEnv = {
  get databaseUri() {
    return getEnv('DATABASE_URI');
  },
  get payloadSecret() {
    return getEnv('PAYLOAD_SECRET');
  },
  get s3Bucket() {
    return getEnv('S3_BUCKET');
  },
  get s3Region() {
    return getEnv('S3_REGION', 'auto');
  },
  get s3Endpoint() {
    return getEnv('S3_ENDPOINT');
  },
  get s3AccessKeyId() {
    return getEnv('S3_ACCESS_KEY_ID');
  },
  get s3SecretAccessKey() {
    return getEnv('S3_SECRET_ACCESS_KEY');
  },
  get publicServerUrl() {
    return getEnv('PUBLIC_SERVER_URL', 'http://localhost:3002');
  },
} as const;
