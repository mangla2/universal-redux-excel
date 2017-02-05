const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin=require('extract-text-webpack-plugin');
const assetsPath = path.resolve(__dirname, '/dist');
module.exports = {
  devtool: 'source-map',
  context: path.resolve(__dirname),
  entry: {
    main: [
      './src/index.js',
    ],
  },
  output: {
    path: assetsPath,
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
          test: /\.css$/,
          loader:ExtractTextPlugin.extract('style-loader','css-loader'),
      },
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?name=fonts/[name].[ext]&mimetype=application/octet-stream'}
    ],
  },
  progress: true,
  resolve: {
    modulesDirectories: [
      'node_modules',
      'src',
    ],
    extensions: ['', '.json', '.js', '.jsx'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },

    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('[name].css', {

        allChunks: true,
      }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ],
};
