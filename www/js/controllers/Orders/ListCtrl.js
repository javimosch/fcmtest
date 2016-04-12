angular.module('shopmycourse.controllers')

.controller('OrdersListCtrl', function($scope, $ionicLoading, OrderStore) {
  $scope.orders = [];
  $scope.status = 'pending';

  $ionicLoading.show({
    template: 'Nous recherchons vos commandes...'
  });

  OrderStore.get({}, function (err, orders) {
    $scope.orders = orders;
    $ionicLoading.hide();
  }, function (err) {
    console.error(err);
    $ionicLoading.hide();
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
