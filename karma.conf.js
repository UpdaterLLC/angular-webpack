var path = require('path');
var webpackConfig = require('./webpack.config.js');
delete webpackConfig.entry;
delete webpackConfig.output;

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: ['karma-spec.js'],
    preprocessors: {'karma-spec.js': ['webpack']},
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
      stats: {
        chunkModules: false,
        colors: true
      }
    },
    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    },
    reporters: ['spec', 'coverage', 'html'],
    specReporter: {
      maxLogLines: 5,         // limit number of lines logged per test
      suppressErrorSummary: true,  // do not print error summary
      suppressFailed: false,  // do not print information about failed tests
      suppressPassed: false,  // do not print information about passed tests
      suppressSkipped: true,  // do not print information about skipped tests
      showSpecTiming: false // print the time elapsed for each spec
    },
    coverageReporter: {
      dir: 'coverage/',
      subdir: '.',
      reporters: [
        {type: 'cobertura', file: 'cobertura.xml'},
        {type: 'text', file: 'text.txt'},
        {type: 'text-summary', file: 'text-summary.txt'},
        {type: 'html'}
      ]
    },
    htmlReporter: {
      outputDir: 'coverage',
      templatePath: null,
      focusOnFailures: true,
      namedFiles: true,
      pageTitle: 'karma test report',
      urlFriendlyName: false,
      reportName: 'karma-report',
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_DEBUG,
    autoWatch: false,
    browsers: ['PhantomJS_Desktop'],
    customLaunchers: {
      'PhantomJS_Desktop': {
        base: 'PhantomJS',
        options: {
          viewportSize: {
            width: 1280,
            height: 1000
          }
        }
      }
    },
    singleRun: true,
    captureTimeout: 10000,
  });
};
