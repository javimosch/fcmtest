angular.module('shopmycourse.controllers')

.controller('DeliveriesListCtrl', function($scope, $state, DeliveryStore) {

  $scope.deliveries = [];
  $scope.status = 'pending';

  DeliveryStore.get({}, function (err, deliveries) {
    $scope.deliveries = deliveries;
  }, function (err) {
    console.error(err);
  });
})
