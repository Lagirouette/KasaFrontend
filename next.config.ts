import type { NextConfig } from "next";

const apiUrl = new URL(process.env.API_URL ?? "http://localhost:3000");
const apiIsLocal = ["localhost", "127.0.0.1", "[::1]"].includes(apiUrl.hostname);

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  serverExternalPackages: ["nodemailer"],
  images: {
    deviceSizes: [640, 750, 1080, 1200, 1920, 2240],
    imageSizes: [64, 128, 256, 384],
    dangerouslyAllowLocalIP: apiIsLocal,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3-eu-west-1.amazonaws.com",
        pathname: "/course.oc-static.com/projects/front-end-kasa-project/**",
      },
      {
        protocol: apiUrl.protocol === "https:" ? "https" : "http",
        hostname: apiUrl.hostname,
        port: apiUrl.port,
        pathname: "/uploads/**",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
