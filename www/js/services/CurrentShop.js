angular.module('shopmycourse.services')

.service('CurrentShop', function ($rootScope, DataStorage) {
    var currentShop = DataStorage.getObject('current_shop') || {};
    $rootScope.currentShop = currentShop;

    return {
        get: function () {
            return (currentShop);
        },
        set: function(shop) {
            currentShop = shop;
            DataStorage.setObject('current_shop', currentShop);
            $rootScope.currentShop = currentShop;
        },
        clean: function(key) {
        	currentShop = {};
            DataStorage.remove('current_shop');
        }
    };
});
