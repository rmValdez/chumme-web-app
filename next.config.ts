/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "export", // This replaces the "next export" command
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
