import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
   remotePatterns: [
  {
    protocol: "http",
    hostname: "localhost",
    port: "8000",
    pathname: "/storage/**",
  },
  {
    protocol: "http",
    hostname: "127.0.0.1",
    port: "8000",
    pathname: "/storage/**",
  },
],

    domains: ["images.unsplash.com", "picsum.photos"], // bisa tetap digabung
  },
};

export default nextConfig;
