const webpack=require('webpack');
const path=require('path');
const ExtractTextPlugin=require('extract-text-webpack-plugin');

const node_dir = __dirname + '/node_modules';


const config={

  context:__dirname,
  devTool:'cheap-module-source-map',
  entry:{

    app:['webpack-hot-middleware/client','./src/index.js'],
  },
  output:{
    path: path.join(__dirname,'dist'),
    filename: '[name].bundle.js',
    publicPath:'/',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module:{
    loaders:[
      {
      exclude: /node_modules/,
      test: /\.(js|jsx)$/,
      loaders:  ['react-hot', 'babel?presets[]=es2015,presets[]=stage-2,presets[]=react'],
    },
  ],
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
  },
  plugins: [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env':{
    'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    'BROWSER':JSON.stringify(true)
  }
}),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),

 ],
};

module.exports = config;
