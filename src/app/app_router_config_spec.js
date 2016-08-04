describe('Application Router', () => {

  let app;
  beforeEach(() => {
    app = angular.module('app.test', ['ngRoute']);
    app.config(require('./app_router_config.js')(app));
    app.run(['$injector', $injector => app.loadModule = $injector.loadModule.bind($injector)]);
  });
  beforeEach(angular.mock.module('app.test'));

  let $route, $location, $rootScope;
  beforeEach(angular.mock.inject((_$route_, _$location_, _$rootScope_) => {
    $route = _$route_;
    $location = _$location_;
    $rootScope = _$rootScope_;
  }));


  it('should have route to /home', () => {
    expect($route.routes['/home']).toBeDefined();
    expect($route.routes['/home'].template).toBe('<home></home>');
  });

  it('should route / to /home as default', () => {
    expect($route.routes[null].redirectTo).toEqual('/home');
    expect($route.current).toBeUndefined();

    $location.path('/');
    $rootScope.$digest();
    expect($location.path()).toBe('/home');
  });

  it('should route /home', function() {
    $location.path('/home');
    $rootScope.$digest();

    expect($route.current.$$route).toBe($route.routes['/home']);
  });

});
