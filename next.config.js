module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: '@svgr/webpack',
    })
    config.resolve.fallback = { fs: false }

    return config
  },
  images: { domains: ['firebasestorage.googleapis.com'] },
  // reactStrictMode: false,
  // webpack5: true,
  optimizeFonts: false,
  env: {
    MONGO_URI:
      'mongodb+srv://jiro:jiro@cluster0.si4pk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  },
}
