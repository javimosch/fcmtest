angular.module('shopmycourse.controllers')

.controller('DeliveriesListCtrl', function($scope, $state, DeliveryAPI) {
  $scope.deliveries = [];
  $scope.status = 'pending';

  DeliveryAPI.mines({}, function (deliveries) {
    $scope.deliveries = deliveries;
  }, function (err) {
    console.error(err);
  });
})
