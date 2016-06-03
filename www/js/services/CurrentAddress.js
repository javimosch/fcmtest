angular.module('shopmycourse.services')

.service('CurrentAddress', function ($rootScope, lodash, DataStorage) {
    var currentAddress = {};

    function init () {
      return DataStorage.get('current_address').then(function (currentAddressFromStorage) {
        currentAddress = currentAddressFromStorage || {};
        $rootScope.currentAddress = currentAddress;
        console.log($rootScope.currentAddress)
      });
    }
    init();

    return {
        init: init,
        set: function(address) {
          currentAddress = address;
          DataStorage.set('current_address', address);
        },
        get: function() {
          return currentAddress;
        }
    };
});
