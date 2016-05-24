export class productsService {
  constructor($http, $window) {
    'ngInject';
    this.products = null;

    this.$http = $http;
    this.$window = $window;
  }

  get() {
    if (!this.products) {
      this.products = angular.fromJson(this.$window.localStorage.getItem('products'));

      if (!this.products) {
        this.products = this.getProductsFromServer()
          .then((response) => {
            this.$window.localStorage.setItem('products', angular.toJson(response.data));
            this.products = response.data;

            return this.products;
          });
      }
    }

    return Promise.resolve(this.products);
  }

  getProductsFromServer() {
    return this.$http.get('https://sandbox.simpleorder.com/client-side-test/mock-data');
  }

  getProductById(id) {
    const product = angular.copy(_.find(this.products, { id }));
    return Promise.resolve(product);
  }

  edit(id, newEntry) {
    _.merge(_.find(this.products, { id }), newEntry);
    this.$window.localStorage.setItem('products', angular.toJson(this.products));

    this.$http.put(`/product/${id}`, newEntry);

    return Promise.resolve({ message: 'Product edited succesfully' });
  }

}
