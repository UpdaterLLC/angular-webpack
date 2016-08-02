exports.config = {

  allScriptsTimeout: 11000,

  chromeOnly: true,
  // chromeDriver: './node_modules/protractor/selenium/chromedriver',
  // chromeDriver: './node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver',

  capabilities: {
    'browserName': 'chrome'
  },

  specs: [
    // 'src/**/*_e2e_spec.js'
    'scenarios.js',
  ],

  rootElement: '.content',

  baseUrl: 'http://localhost:8080/',

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};