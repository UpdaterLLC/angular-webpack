
const app = angular.module('app', [
  'ngRoute',
  'ui.bootstrap',
  'ngResource',
  'ipCookie',
  'ngSanitize',
  'validation.match'
]);

app.config(['$logProvider',
  ($logProvider) => $logProvider.debugEnabled(process.env.NODE_ENV !== 'production')]);

app.config(require('./app/app_router_config')(app));

app.run(['$injector', $injector => app.register = $injector.loadModule.bind($injector)]);

export default app;
