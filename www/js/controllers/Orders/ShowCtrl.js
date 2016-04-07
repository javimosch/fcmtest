angular.module('shopmycourse.controllers')

.controller('OrdersShowCtrl', function($scope, $rootScope, $stateParams, CurrentCart, $ionicModal, OrderStore, $interval) {

  $scope.order = {};

  OrderStore.get({id: parseInt($stateParams.idOrder)}, function (err, order) {
    $scope.order = order[0];
  })

  $ionicModal.fromTemplateUrl('templates/Orders/Modals/Finish.html', {
      scope: $scope,
      animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.finishOrderModal = modal
  });

  $rootScope.setOrder = function (order) {
    $scope.order = order;
  };

  $scope.openFinishOrderModal = function () {
    $scope.finishOrderModal.show();
  };

  $scope.closeFinishOrderModal = function () {
    $scope.finishOrderModal.hide();
  };
})
