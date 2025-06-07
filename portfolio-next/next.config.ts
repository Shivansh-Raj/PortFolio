import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['placehold.co', 'i.pravatar.cc'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}
export default nextConfig;
