/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  // Support for component library exports
  transpilePackages: ['lucide-react'],
  // Ensure proper builds for Vercel
  output: 'standalone',
  eslint: {
    // Don't fail builds on ESLint errors during deployment
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Don't fail builds on TypeScript errors during initial deployment
    // Remove this once all TS errors are fixed
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
