import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/kwsahe",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
