angular.module('shopmycourse.services')

.service('CurrentDelivery', function ($rootScope, $localstorage) {
    var currentDelivery = $localstorage.getObject('current_delivery') || {};
    $rootScope.currentDelivery = currentDelivery;

    return {
        get: function () {
            return (currentDelivery);
        },
        set: function(delivery) {
            currentDelivery = delivery;
            $localstorage.setObject('current_delivery', currentDelivery);
            $rootScope.currentDelivery = currentDelivery;
        },
        clean: function(key) {
        	currentDelivery = {};
            $localstorage.remove('current_delivery');
        }
    };
}); 