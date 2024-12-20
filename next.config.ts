import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dreamlink",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
