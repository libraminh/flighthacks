'use strict'

const utils = require('./utils')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const glob = require('glob');

const PurgecssPlugin = require('purgecss-webpack-plugin')
const path = require('path')

const config = require('./config')
const themePath = utils.themePath(config.targetDomain)

const PATHS = {
  src: path.join(__dirname, 'asset')
}

module.exports = merge(baseConfig, {
  mode: 'production',

  output: {
    path: utils.resolve(`../../site/web${themePath}/public`),
    pathinfo: false,
    filename: 'js/[name].js',
    publicPath: `${themePath}/public/`
  },

  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      automaticNameMaxLength: 30,
      name: true,
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
          priority: -10
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      },
    },
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
      // new UglifyJsPlugin({parallel: true}),
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          parser: require('postcss-safe-parser'),
          preset: ['default', { discardComments: { removeAll: true } }],
        }
      }),
    ]
  },

  plugins: [
    new CopyWebpackPlugin([{
      from: utils.resolve('assets/static/img'),
      to: utils.resolve(`../../site/web${themePath}/public/img`),
      toType: 'dir'
    }]),
    new PurgecssPlugin({
      paths: glob.sync(`${PATHS.src}/*`)
    })
  ]
})
