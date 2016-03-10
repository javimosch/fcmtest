angular.module('shopmycourse.services')

.service('OrderStore', function (Store) {

  var orderStore = Store('Delivery', {
    pullRouteName: 'orders'
  });

  return orderStore;
});
