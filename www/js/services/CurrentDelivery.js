angular.module('shopmycourse.services')

.service('CurrentDelivery', function ($rootScope, DataStorage) {

    var currentDelivery = {
      schedules: {},
      shop: {}
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
        setSchedule: function (schedules, next) {
          currentDelivery.schedules = schedules;
          return DataStorage.set('current_delivery', currentDelivery).then(function () {
            $rootScope.currentDelivery = currentDelivery;
            return next(currentDelivery);
          });
        },
        setShop: function (shop, next) {
          currentDelivery.shop = shop;
          return DataStorage.set('current_delivery', currentDelivery).then(function () {
            $rootScope.currentDelivery = currentDelivery;
            return next(currentDelivery);
          });
        },
        clear: function (next) {
          DataStorage.remove('current_delivery').then(next);
        }
    };

});
