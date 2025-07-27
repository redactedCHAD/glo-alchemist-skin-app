import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable compression
  compress: true,
  // Optimize for production
  poweredByHeader: false,
};

export default nextConfig;
