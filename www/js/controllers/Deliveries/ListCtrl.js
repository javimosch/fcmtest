angular.module('shopmycourse.controllers')

.controller('DeliveriesListCtrl', function($scope, $state, DeliveryStore) {

  $scope.deliveries = [];
  $scope.status = 'pending';

  DeliveryStore.get({}, function (err, deliveries) {
    $scope.deliveries = deliveries;
  }, function (err) {
    console.error(err);
  });

  $scope.byStatus = function (status) {
    var statuses = ['done'];
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
})
