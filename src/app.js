require('jquery/dist/jquery.min.js');
require('expose?$!expose?jQuery!jquery');
require('bootstrap-webpack');
require('angular-bootstrap/ui-bootstrap-tpls.min.js');
require('./app.styl');

const app = angular.module('app', [
  'ngRoute'
]);

app.config(['$logProvider',
  ($logProvider) => $logProvider.debugEnabled(process.env.NODE_ENV !== 'production')]);

app.config(require('./app/app_router_config')(app));

app.run(['$injector', $injector => app.register = $injector.loadModule.bind($injector)]);

export default app;
