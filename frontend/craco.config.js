const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@context': path.resolve(__dirname, 'src/context'),
      '@public': path.resolve(__dirname, 'public'),
      '@': path.resolve(__dirname, 'src'),
    },
  },
};