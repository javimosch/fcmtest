angular.module('shopmycourse.controllers')

.controller('OrdersListCtrl', function($scope, OrderStore) {
  $scope.orders = [];
  $scope.status = 'pending';

  OrderStore.get({}, function (err, orders) {
    $scope.orders = orders;
  }, function (err) {
    console.error(err);
  });
})
