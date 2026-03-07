import { withPayload } from '@payloadcms/next/withPayload';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	experimental: {
		externalDir: true,
	},
};

export default withPayload(nextConfig);
