import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // 配置静态产出
  output: "export",
  webpack: config => {
    config.resolve.fallback = { fs: false };
    return config;
  },
};

export default nextConfig;
