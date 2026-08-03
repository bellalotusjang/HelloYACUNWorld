import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // Prevent Next.js from picking a parent directory lockfile as workspace root
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
