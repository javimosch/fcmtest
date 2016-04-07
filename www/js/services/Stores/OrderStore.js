angular.module('shopmycourse.services')

.service('OrderStore', function (Store) {

  var orderStore = Store('Delivery', {
    pullRouteName: 'orders'
  });

  orderStore.update = function (attributes, next) {
    attributes.idDelivery = attributes.id;
    this._customAction('update', attributes, next);
  }

  return orderStore;
});
