/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/about',
        destination: '/#about',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
