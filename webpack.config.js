var path = require('path');
var argv = require('yargs').argv;
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var sources = [
  path.resolve('./src')
];

var config = {
  target: 'web',
  resolve: {
    root: path.join(__dirname, ''),
    modulesDirectories: ['node_modules'],
    alias: {
      spin: 'spin.js',
      angular: path.join(process.cwd(), 'vendor/angular.src.js'),
      'angular-spinner': path.join(process.cwd(), 'vendor/angular-spinner.js'),
      d3: 'd3/d3.js',
      nvd3: 'nvd3/nv.d3.js',
    }
  },
  entry: {
    app: [
      'jquery',
      'angular',
      './node_modules/angular/angular-csp.css',
      'angular-route',
      'angular-resource',
      'angular-cookie',
      'angular-sanitize',
      'angular-animate',
      'angular-validation-match',
      'd3',
      'nvd3',
      './node_modules/nvd3/nv.d3.css',
      'angularjs-nvd3-directives',
      './vendor/ui-bootstrap-remedy.css',
      'bootstrap-webpack',
      'angular-ui-bootstrap',
      'font-awesome-webpack',
      'spin.js',
      'angular-spinner',
      'node-uuid',
      'msgpack-lite',
      'axios',
      'ng-storage',
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
      {test: /\.js$/, loader: 'babel', include: sources},
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
    preLoaders: [{test: /\.js$/, loader: 'eslint', include: sources}],
    noParse: [
      /\.min\.js/,
      /angular\.src\.js/
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery', jQuery: 'jquery', "window.jQuery": 'jquery',
      _: 'lodash',
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
  config.devtool = 'eval';
  config.cache = true;
  config.plugins = config.plugins.concat([
    new webpack.DefinePlugin({'process.env': {NODE_ENV: JSON.stringify('test')}})
  ]);
  if (argv.coverage) {
    config.module.preLoaders = [
      {test: /_spec\.js$/, loader: 'babel', include: sources},
      {test: /\.js$/, loader: 'isparta', include: sources, exclude: /_spec\.js$/}
    ].concat(config.module.preLoaders);
  }

}

module.exports = config;
