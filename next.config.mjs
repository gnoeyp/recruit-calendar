/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'daoift3qrrnil.cloudfront.net',
      },
    ],
  },
};

export default nextConfig;
