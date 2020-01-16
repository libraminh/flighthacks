'use strict'

const utils = require('./utils')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const config = require('./config')

// const themePath = utils.themePath(config.targetDomain)

const glob = require('glob');

const path = require('path')


module.exports = merge(baseConfig, {
  mode: 'development',
  output: {
    path: utils.resolve('../web'),
    pathinfo: false,
    filename: 'js/[name].js',
    publicPath: './'
  },

  plugins: [
    new CopyWebpackPlugin([{
      from: utils.resolve('assets/static/img'),
      to: utils.resolve('../web/img'),
      toType: 'dir'
    }]),
  ]
})
