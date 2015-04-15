var webpack = require('webpack');

module.exports = {
  entry: './js/tilemapper.js',
  output: {
    path: './dist/',
    filename: 'tilemapper.min.js',
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
  ],
};
