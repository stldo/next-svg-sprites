const { resolve } = require('path')

const SvgSpriteLoaderPlugin = require('svg-sprite-loader/plugin')

const fixRulesDeclarations = require('./fix-rules-declarations')
const getMinifiedId = require('./get-minified-id')

module.exports = (config, {
  extract = true,
  minifyIds = process.env.NODE_ENV === 'production',
  pluginOptions = {},
  symbolId = '[name]--[hash:base64:5]',
  ...options
}) => ({
  ...config,

  webpack: (webpackConfig, ...rest) => {
    fixRulesDeclarations(webpackConfig.module.rules)

    webpackConfig.module.rules.push({
      test: /\.svg$/i,
      use: [{
        loader: 'svg-sprite-loader',
        options: {
          esModule: false,
          extract,
          spriteFilename: 'static/sprites.[contenthash].svg',
          symbolId: minifyIds ? getMinifiedId : symbolId,
          ...options
        }
      }, {
        loader: resolve(__dirname, 'disable-cache-for-svg.js')
      }]
    })

    if (extract) {
      webpackConfig.plugins.push(new SvgSpriteLoaderPlugin({
        plainSprite: true,
        ...pluginOptions
      }))
    }

    return typeof config.webpack === 'function'
      ? config.webpack(webpackConfig, ...rest)
      : webpackConfig
  }
})
