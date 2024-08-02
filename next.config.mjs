/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const repoName = "wedding"; // 替换为你的仓库名

const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : "",
  output: "export",
  images: {
    unoptimized: true,
  },
  publicPath: isProd ? `/${repoName}/` : "/",
};

export default nextConfig;
