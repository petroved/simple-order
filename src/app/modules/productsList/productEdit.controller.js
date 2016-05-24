export class ProductEditController {
  constructor($uibModalInstance, $timeout, productsService, productId) {
    'ngInject';

    this.ProductForm = {};
    this.submitted = false;
    this.product = null;

    this.$timeout = $timeout;
    this.$uibModalInstance = $uibModalInstance;
    this.productsService = productsService;

    this.activate(productId);
  }

  activate(productId) {
    this.productsService.getProductById(productId)
      .then((response) => {
        this.$timeout(() => {
          this.product = response;
        });
      });
  }

  edit() {
    if (this.ProductForm.$invalid) {
      this.submitted = true;

      return false;
    }

    return this.$uibModalInstance.close(this.product);
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }

}
