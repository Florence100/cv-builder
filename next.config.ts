import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
        port: '',
        search: '',
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin('./src/shared/i18n/request.ts');
export default withNextIntl(nextConfig);
