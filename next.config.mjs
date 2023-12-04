/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.media-amazon.com'
      }
    ]
  }
}

export default nextConfig
