import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // 配置静态产出
  output: "export",
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com'],
  },
  webpack: config => {
    config.resolve.fallback = { fs: false };
    return config;
  },
};

export default nextConfig;
