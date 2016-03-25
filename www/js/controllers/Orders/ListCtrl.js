angular.module('shopmycourse.controllers')

.controller('OrdersListCtrl', function($scope, OrderStore) {
  $scope.orders = [];
  $scope.status = 'pending';

  OrderStore.get({}, function (err, orders) {
    $scope.orders = orders;
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
