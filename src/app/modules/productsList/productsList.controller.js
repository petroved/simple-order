export class ProductsListController {
  constructor(productsService, $timeout, $uibModal) {
    'ngInject';

    this.products = null;
    this.sortType = 'name'; // set the default sort type
    this.sortReverse = false;
    this.search = '';

    this.productsService = productsService;
    this.$timeout = $timeout;
    this.$uibModal = $uibModal;

    this.activate();
  }

  activate() {
    this.productsService.get()
      .then((response) => {
        this.$timeout(() => {
          this.products = response;
        });
      });
  }

  showEditModal(id) {
    const modalInstance = this.$uibModal.open({
      templateUrl: 'src/app/modules/productsList/productEdit.modal.html',
      controller: 'ProductEditController as vm',
      resolve: {
        productId: () => id,
      },
    });

    modalInstance.result.then((newProduct) => {
      this.productsService.edit(id, newProduct);
    });
  }

  order(sortType) {
    this.sortReverse = (this.sortType === sortType) ? !this.sortReverse : false;
    this.sortType = sortType;
  }
}
