angular.module('shopmycourse.services')

.service('CurrentDelivery', function ($rootScope, DataStorage) {
    var currentDelivery = DataStorage.get('current_delivery') || {};
    $rootScope.currentDelivery = currentDelivery;

    return {
        get: function () {
            return (currentDelivery);
        },
        set: function(delivery) {
            currentDelivery = delivery;
            DataStorage.set('current_delivery', currentDelivery);
            $rootScope.currentDelivery = currentDelivery;
        },
        clean: function(key) {
        	currentDelivery = {};
            DataStorage.remove('current_delivery');
        }
    };
}); 
