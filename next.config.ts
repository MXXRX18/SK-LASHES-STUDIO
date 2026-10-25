import type { NextConfig } from "next";

const config: NextConfig = {
  output: "export",
  basePath: "/SK-LASHES-STUDIO",
  trailingSlash: true,
  poweredByHeader: false,
  images: { unoptimized: true },
};

export default config;