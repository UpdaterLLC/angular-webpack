var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
  entry: {
    app: [
      'jquery/dist/jquery.min.js',
      './vendor/angular.src.js',
      'angular/angular-csp.css',
      'angular-route/angular-route.js',
      'angular-resource/angular-resource.js',
      'angular-cookie/angular-cookie.min.js',
      'angular-sanitize/angular-sanitize.js',
      'angular-validation-match/dist/angular-validation-match.js',
      'd3/d3.js',
      'nvd3/nv.d3.js',
      'nvd3/nv.d3.css',
      'angularjs-nvd3-directives/dist/angularjs-nvd3-directives.js',
      './vendor/ui-bootstrap-remedy.css',
      'bootstrap-webpack',
      'angular-ui-bootstrap',
      'font-awesome-webpack',
      './src/app.styl',
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
      {test: /\.json$/, loader: 'json' },
      {test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css?sourceMap')},
      {test: /\.styl$/, loader: 'style!css!stylus?paths=node_modules/stylus/' },

      {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"},
      {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },

      {
        test: /\.sass$/,
        loader: ExtractTextPlugin
          .extract('style', 'css?sourceMap!sass?sourceMap&indentedSyntax=true')
      },
      {test: /\.(png|jpg|jpeg|gif)$/, loader: 'url?limit=32768'},
      {test: /\.html$/, loader: 'ng-cache?prefix=[dir]/[dir]'},
      {test: /\.haml$/, loader: 'hamlc-loader'}
    ],
    preLoaders: [{test: /\.js$/, loader: 'eslint', include: path.resolve('src')}],
    noParse: [
      /\.min\.js/,
      /angular\.src\.js/
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery', jQuery: 'jquery', "window.jQuery": 'jquery',
      _: 'lodash',
      'window.d3': 'd3',
      nv: 'nvd3', 'window.nv': 'nvd3',
      // 'window.angular': 'angular.src.js',
    }),
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
    new webpack.DefinePlugin({'process.env': {NODE_ENV: JSON.stringify('production')}})
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
    new webpack.DefinePlugin({'process.env': {NODE_ENV: JSON.stringify('test')}})
  ]);
}

module.exports = config;
