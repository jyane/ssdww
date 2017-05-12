'use strict'

const path = require('path');

module.exports = {
  entry: [
    path.join(__dirname, 'src', 'index')
  ],
  output: {
    path: path.join(__dirname, '..', 'modules', 'app', 'public'),
    filename: 'bundle.js'
  },
  cache: true,
  devtool: 'inline-source-map',
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.css']
  },
  module: {
    rules: [{
      test: /\.js/,
      use: 'babel-loader',
      include: path.join(__dirname, 'src')
    }]
  }
};
