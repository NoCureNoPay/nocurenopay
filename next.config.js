/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'da'],
    defaultLocale: 'en',
    localeDetection: false,
  },
  
  reactStrictMode: true,
  images: {
      domains: ['api.nocurenopay.net','localhost'],
  },
}

module.exports = nextConfig
