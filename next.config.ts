import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  experimental: {
    // Enable server actions if needed
  },
};

export default nextConfig;
