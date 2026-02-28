const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: path.resolve(__dirname) // ye automatically current project folder ko root bana dega
  },
  distDir: '.next' // default, change nahi karna
};

module.exports = nextConfig;