// next.config.js
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['d25ltszcjeom5i.cloudfront.net'], // Añade el dominio de Cloudfront
  },
};

module.exports = nextConfig;
