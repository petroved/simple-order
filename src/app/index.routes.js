export function routerConfig($stateProvider, $urlRouterProvider) {
  'ngInject';

  $urlRouterProvider.otherwise('/products');

  $stateProvider
    .state('index', {
      url: '',
      abstract: true,
      templateUrl: 'src/app/main/layout/content.html',
      controller: 'MainController as main',
    })
    .state('index.products', {
      url: '/products',
      templateUrl: 'src/app/modules/productsList/productsList.html',
      // templateProvider: ($q) =>
      //   $q((resolve) => {
      //     require.ensure([], () => {
      //       const template = require('./modules/productsList/productsList.html');
      //       resolve(template);
      //     }, 'productsList');
      //   }),
      controller: 'ProductsListController as vm',
      resolve: {
        loadProductsListController: ($q, $ocLazyLoad) =>
          $q((resolve) => {
            require.ensure([], () => {
              // load whole module
              const module = require('./modules/productsList/productsList.module');
              $ocLazyLoad.load([
                { name: module.name },
              ]);
              resolve(module.controller);
            }, 'productsList');
          }),
      },
    });
}
