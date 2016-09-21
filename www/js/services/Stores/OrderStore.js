angular.module('shopmycourse.services')

/**
 * @name OrderStore
 * @function Service
 * @memberOf shopmycourse.services
 * @description Stockage des demandes de livraison
 */

.service('OrderStore', function(Store) {

  var deliveryRequestStore = Store('DeliveryRequest');


  var orderStore = Store('Delivery', {
    pullRouteName: 'orders'
  });

  orderStore.update = function(attributes, next) {
    attributes.idDelivery = attributes.id;
    this._customAction('update', attributes, next);
  };

  orderStore.saveProductsUsingDeliveryRequest = function(attributes, next) {
    attributes.idDeliveryRequest = attributes.delivery_request.id;
    deliveryRequestStore._customAction('saveProducts', attributes, next);
  };

  orderStore.fetchProducts = function(attributes, next) {
    deliveryRequestStore._customAction('fetchProducts', {
      idDeliveryRequest: attributes.delivery_request.id
    }, next);
  };
  
  orderStore.calculateCommission = function(attributes, next) {
    deliveryRequestStore._customAction('calculateCommission', {
      total: attributes.total
    }, next);
  };

  return (orderStore);

});
