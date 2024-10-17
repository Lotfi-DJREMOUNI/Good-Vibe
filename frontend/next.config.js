/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: 'loose',
  },
  webpack: (config) => {
    config.externals = [...config.externals, { canvas: 'canvas' }]; // required to make pdfjs work
    return config;
  },
  // Configuration pour l'exportation statique
  output: 'export',
  trailingSlash: true, // Assure que toutes les pages exportées sont servies avec un slash
};

module.exports = nextConfig;