import { routerConfig } from './index.routes';

import { productsService } from './main/services/products.service';

import { MainController } from './main/layout/main.controller.js';

import './index.scss';

const app = angular.module(
  'simpleOrder', [
    'ui.router',
    'ui.bootstrap',
    'oc.lazyLoad',
  ]);

app
  .config(routerConfig)
  .service('productsService', productsService)
  .controller('MainController', MainController);

export default app;
