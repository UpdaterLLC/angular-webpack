const route = (entry, resolve) => ({
  template: '<' + entry + '></' + entry + '>',
  resolve: {
    async: ['$q', function ($q) {
      const defer = $q.defer();

      resolve(defer.resolve);
      return defer.promise;
    }]
  }
});


export default app => {

  // We have to use hardcoded value for 'require' so it can be statically built
  // require.ensure https://webpack.github.io/docs/code-splitting.html
  const RouterConfig = ($routeProvider) => {
    $routeProvider

      .when('/home', route('home', resolve =>
        require.ensure([], () =>
          resolve(app.loadModule(require('./home').name)))))

      .when('/about', route('about', resolve =>
        require.ensure([], () =>
          resolve(app.loadModule(require('./about').name)))))

      .when('/haml', route('haml', resolve =>
        require.ensure([], () =>
          resolve(app.loadModule(require('./haml').name)))))

      .otherwise({redirectTo: '/home'});
  };

  RouterConfig.$inject = ['$routeProvider'];

  return RouterConfig;
};
