import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/blog/tag/:path*',
        destination: '/blog/tags/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
