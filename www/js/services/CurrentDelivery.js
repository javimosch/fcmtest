angular.module('shopmycourse.services')

.service('CurrentDelivery', function ($rootScope, DataStorage) {

    var currentDelivery = {
      schedule: {},
      shop_id: null
    };

    return {
        init: function (next) {
          return DataStorage.get('current_delivery').then(function (currentDeliveryFromStorage) {
            currentDelivery = currentDeliveryFromStorage || {};
            $rootScope.currentDelivery = currentDelivery;
            next();
          });
        },
        get: function (next) {
          return next(currentDelivery);
        },
        setSchedule: function (schedule, next) {
          currentDelivery.schedule = schedule;
          return DataStorage.set('current_delivery', currentDelivery).then(function () {
            $rootScope.currentDelivery = currentDelivery;
            return next(currentDelivery);
          });
        },
        setShop: function (shop, next) {
          currentDelivery.shop_id = shop.id;
          currentDelivery.shop_name = shop.name;
          return DataStorage.set('current_delivery', currentDelivery).then(function () {
            $rootScope.currentDelivery = currentDelivery;
            return next(currentDelivery);
          });
        },
        setAddress: function(address, next) {
          currentDelivery.address_attributes = address;
          return DataStorage.set('current_delivery', currentDelivery).then(function () {
            $rootScope.currentDelivery = currentDelivery;
            return next(currentDelivery);
          });
        },
        setDeliveryRequestID: function (delivery_request_id, next) {
          currentDelivery.delivery_request_id = delivery_request_id;
          return DataStorage.set('current_delivery', currentDelivery).then(function () {
            $rootScope.currentDelivery = currentDelivery;
            return next(currentDelivery);
          });
        },
        clear: function (next) {
          DataStorage.remove('current_delivery').then(next);
          currentDelivery = {
            schedule: {},
            shop_id: null
          };
        }
    };

});
