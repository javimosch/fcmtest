angular.module('shopmycourse.controllers')

.controller('OrdersListCtrl', function($scope, $ionicLoading, OrderStore, DeliveryStatus) {
  $scope.orders = [];
  $scope.status = 'pending';

  $ionicLoading.show({
    template: 'Nous recherchons vos commandes...'
  });

  OrderStore.pull(function (err, orders) {
    $scope.orders = orders;
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
      if (status === 'pending' && delivery.rated === false) {
        return true;
      }
      if (statuses.indexOf(delivery.status) > -1) {
        if (status === 'archived' && delivery.rated === true) {
          return true;
        }
      }
      return false
    }
  };


  $scope.deliveryStatus = DeliveryStatus;
})
