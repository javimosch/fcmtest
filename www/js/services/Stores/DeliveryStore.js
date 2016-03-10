angular.module('shopmycourse.services')

.service('DeliveryStore', function (Store) {

  var deliveryStore = Store('Delivery', {
    pullRouteName: 'deliveries'
  });
  
  deliveryStore.mines = function (attributes, next) {
    this._customAction('mines', attributes, next);
  }
  return deliveryStore;
});
