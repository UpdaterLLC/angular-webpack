var testsContext;

require('babel-core/polyfill');
require('jquery');
require('angular');
require('angular-mocks');
require('./node_modules/angular/angular-csp.css');
require('angular-route');
// require('angular-resource');
// require('angular-cookie');
// require('angular-sanitize');
// require('angular-animate');
// require('angular-validation-match');
// require('d3');
// require('nvd3');
// require('./node_modules/nvd3/nv.d3.css');
// require('angularjs-nvd3-directives');
// require('./vendor/ui-bootstrap-remedy.css');
// require('bootstrap-webpack');
// require('angular-ui-bootstrap');
// require('font-awesome-webpack');
// require('spin.js');
// require('angular-spinner');
// require('node-uuid');
// require('msgpack-lite');
// require('axios');
require('ngstorage');
require('./src/app_common.styl');
require('./src/app.styl');
// require('./src/app.js');

testsContext = require.context('./src', true, /_spec\.js$/);
testsContext.keys().forEach(testsContext);
