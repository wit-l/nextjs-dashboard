import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: "/**",
        search: "",
      },
    ],
  },
  // experimental: {
  // ppr: "incremental",
  // },
};

export default nextConfig;
