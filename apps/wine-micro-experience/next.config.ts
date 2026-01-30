import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Turbopack is default in Next.js 16; empty config silences the
  // "webpack config with no turbopack config" error.
  turbopack: {},
  // Kept for webpack fallback (e.g. if --webpack flag is used).
  // Phaser.js needs fs stubbed in the browser bundle.
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    }
    return config
  },
}

export default nextConfig
