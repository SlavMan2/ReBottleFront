module.exports = {
  globDirectory: 'dist/',
  globPatterns: [
    '**/*.{js,css,html,png,jpg,jpeg,svg,ico,json,woff2,ttf}'
  ],
  swDest: 'dist/sw.js',

  navigateFallback: '/index.html',

  cleanupOutdatedCaches: true
};