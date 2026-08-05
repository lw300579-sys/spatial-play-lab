import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // PNGs only in portfolio previews — avoid SVG attachment disposition issues
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
