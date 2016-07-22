var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
  entry: {
    app: [
      './vendor/angular.src.js',
      './node_modules/angular-route/angular-route.js',
      './src/app.js'
    ]
  },
  output: {
    filename: '[name].js',
    path: './dest',
    chunkFilename: '[id].chunk.js'
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel', include: path.resolve('src')},
      {test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css?sourceMap')},

      {
        test: /\.sass$/,
        loader: ExtractTextPlugin
          .extract('style', 'css?sourceMap!sass?sourceMap&indentedSyntax=true')
      },
      {test: /\.(png|jpg)$/, loader: 'url?limit=32768'},
      {test: /\.html$/, loader: 'ng-cache?prefix=[dir]/[dir]'},
      {test: /\.haml$/, loader: 'hamlc-loader'}
    ],
    preLoaders: [{test: /\.js$/, loader: 'eslint', include: path.resolve('src')}],
    noParse: [
      /angular\.src\.js/
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css', {allChunks: true}),
    new HtmlWebpackPlugin({
      template: path.resolve('src', 'index.html'),
      inject: 'body'
    })
  ],
  devtool: '#source-map',
  devServer: {
    historyApiFallback: true,
    stats: {
      chunkModules: false,
      colors: true
    },
    contentBase: './src'
  },
  eslint: {
    configFile: 'src/.eslintrc'
  }
};


if (process.env.NODE_ENV === 'production') {

  config.bail = true;
  config.debug = false;
  config.profile = false;
  // config.devtool = false;
  config.plugins = config.plugins.concat([
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      compress: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]);
}
if (process.env.NODE_ENV === 'development') {
  config.devtool = '#inline-source-map';
  config.plugins = config.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ]);
}
if (process.env.NODE_ENV === 'test') {
  config.bail = true;
  config.debug = false;
  config.profile = false;
  config.devtool = false;
  config.plugins = config.plugins.concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('test')
      }
    })
  ]);
}

module.exports = config;
