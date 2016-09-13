var path = require('path');
var webpack = require('webpack');
// var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',

  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: [ 'app', 'vendor', 'polyfills' ]
    }),

    // new HtmlWebpackPlugin({
    //   filename: 'dist/index.html',
    //   template: 'src/index.html',
    // }),
  ],

  resolve: {
    extensions: ['', '.ts', '.js' ],
  },

  module: {
    loaders: [{
      test: /\.ts$/,
      loaders: [ 'ts-loader', 'angular2-template-loader' ],
    }, {
      test: /\.less$/,
      loaders: [ 'raw', 'less' ],
    }, {
      test: /\.html$/,
      loader: 'html',
    }, {
      test: /\.json$/,
      loader: 'json',
    }, {
      test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
      loader: 'file?name=assets/[name].[hash].[ext]'
    }],
  },

  devServer: {
    historyApiFallback: true,
    stats: 'minimal',
    inline: true,
  }
};
