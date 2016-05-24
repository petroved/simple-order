import { ProductsListController } from './productsList.controller';
import { ProductEditController } from './productEdit.controller';

export default angular.module('productsList', [])
  .controller('ProductsListController', ProductsListController)
  .controller('ProductEditController', ProductEditController);
