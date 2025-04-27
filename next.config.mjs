/** @type {import('next').NextConfig} */
const nextConfig = {
    productionBrowserSourceMaps: false,
    // Ignore TypeScript errors during build
    typescript: {
      ignoreBuildErrors: true,
    },
    // Ignore ESLint errors during build
    eslint: {
      ignoreDuringBuilds: true,
    },
  };
  
  export default nextConfig;