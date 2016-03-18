angular.module('shopmycourse.services')

.service('CurrentShop', function ($rootScope, $localstorage) {
    var currentShop = $localstorage.getObject('current_shop') || {};
    $rootScope.currentShop = currentShop;

    return {
        get: function () {
            return (currentShop);
        },
        set: function(shop) {
            currentShop = shop;
            $localstorage.setObject('current_shop', currentShop);
            $rootScope.currentShop = currentShop;
        },
        clean: function(key) {
        	currentShop = {};
            $localstorage.remove('current_shop');
        }
    };
}); 