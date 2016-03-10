angular.module('shopmycourse.controllers')

.controller('OrdersShowCtrl', function($scope, $stateParams, $ionicModal, OrderStore) {

  $scope.order = {};

  OrderStore.get({id: parseInt($stateParams.idOrder)}, function (err, order) {
    $scope.order = order[0];
    console.log(order);
  })

  $ionicModal.fromTemplateUrl('templates/Orders/Modals/Finish.html', {
      scope: $scope,
      animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.finishOrderModal = modal
  });

  $scope.openFinishOrderModal = function () {
    $scope.finishOrderModal.show();
  };

  $scope.closeFinishOrderModal = function () {
    $scope.finishOrderModal.hide();
  };
})
