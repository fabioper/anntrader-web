/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  swcMinify: false,
  images: {
    unoptimized: true,
  }
}

export default nextConfig
