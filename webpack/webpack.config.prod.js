const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin=require('extract-text-webpack-plugin');

module.exports = {
  devtool:'source-map',
  context: path.resolve(__dirname,'..'),
  entry: {
    app: ['./src/index.js'],
  },
  output: {
    path: path.join(__dirname,'..','dist'),
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
        'NODE_ENV': JSON.stringify('production'),
        'API':'https://universal-redux-excel.herokuapp.com'
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
