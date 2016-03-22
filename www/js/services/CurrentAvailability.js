angular.module('shopmycourse.services')

.service('CurrentAvailability', function ($rootScope, AvailabilityAPI, DataStorage) {

    var currentAvailability = [];

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
        set: function (availability, next) {
          currentAvailability = availability;
          return DataStorage.set('current_availability', currentAvailability).then(function () {
            $rootScope.currentAvailability = currentAvailability;
            return next(currentAvailability);
          });
        },
        clear: function (next) {
          DataStorage.remove('current_availability').then(next);
        },
        cancel: function (next) {
          async.each(currentAvailability, function (availability, next) {
            AvailabilityAPI.delete({idAvailability: availability.id}, function (a, b) {
              console.log((a, b));
              return next();
            })
          }, next)
        }
    };

});
