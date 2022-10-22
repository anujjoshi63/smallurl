/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};

const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports = withPWA({
  ...nextConfig,
});
