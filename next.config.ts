import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  i18n: {
    locales: ['id', 'en'],
    defaultLocale: 'id',
    localeDetection: false,
  },
};

export default nextConfig;
