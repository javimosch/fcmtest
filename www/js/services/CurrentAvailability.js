angular.module('shopmycourse.services')

.service('CurrentAvailability', function ($rootScope, AvailabilityAPI, DataStorage) {

    var currentAvailability = {
      schedules: [],
      shop_id: null,
      deliveryman_id: $rootScope.currentUser.id
    };

    return {
        load: function (next) {
          return AvailabilityAPI.get({}, function(currentAvailabilityFromServer) {
            currentAvailability = currentAvailabilityFromServer || {};
            $rootScope.currentAvailability = currentAvailability;
            DataStorage.set('current_availability', currentAvailabilityFromServer);
            return next(currentAvailability);
          });
        },
        get: function (next) {
          return next(currentAvailability);
        },
        setSchedules: function (schedules, next) {
          if (currentAvailability.constructor === Array) {
            currentAvailability = {
              schedules: [],
              shop_id: null,
              deliveryman_id: $rootScope.currentUser.id
            };
          }
          currentAvailability.schedules = schedules;
          return DataStorage.set('current_availability', currentAvailability).then(function () {
            $rootScope.currentAvailability = currentAvailability;
            return next(currentAvailability);
          });
        },
        setShop: function (shop, next) {
          if (currentAvailability.constructor === Array) {
            currentAvailability = {
              schedules: [],
              shop_id: null,
              deliveryman_id: $rootScope.currentUser.id
            };
          }
          currentAvailability.shop_id = shop.id;
          return DataStorage.set('current_availability', currentAvailability).then(function () {
            $rootScope.currentAvailability = currentAvailability;
            console.log($rootScope.currentAvailability)
            return next(currentAvailability);
          });
        },
        clear: function (next) {
          currentAvailability = {
            schedules: [],
            shop_id: null,
            deliveryman_id: $rootScope.currentUser.id
          };
          $rootScope.currentAvailability = currentAvailability;
          DataStorage.remove('current_availability').then(next);
        },
        cancel: function (next) {
          async.each(currentAvailability, function (availability, next) {
            AvailabilityAPI.cancel({idAvailability: availability.id}, function (a, b) {
              return next();
            }, function(err) {
              return next(err);
            })
          }, next)
        }
    };

});
