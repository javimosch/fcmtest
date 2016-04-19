angular.module('shopmycourse.controllers')

.controller('DeliveriesListCtrl', function($scope, $ionicLoading, $state, DeliveryStore, DeliveryStatus) {

  $scope.deliveries = [];
  $scope.status = 'pending';

  $ionicLoading.show({
    template: 'Nous recherchons vos livraisons...'
  });

  DeliveryStore.get({}, function (err, deliveries) {
    $scope.deliveries = deliveries;
    $ionicLoading.hide();
  }, function (err) {
    console.error(err);
    $ionicLoading.hide();
  });

  $scope.byStatus = function (status) {
    var statuses = ['done', 'canceled'];
    if (status === 'pending') {
      statuses = ['pending', 'accepted', 'completed']
    }
    return function (delivery) {
      if (statuses.indexOf(delivery.status) > -1) {
        return true;
      }
      return false
    }
  };

  $scope.deliveryStatus = DeliveryStatus;
})
