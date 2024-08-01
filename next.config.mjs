/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  basePath: isProd ? "/{repository-name}" : "",
  assetPrefix: isProd ? "/{repository-name}/" : "",
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
