angular.module('shopmycourse.controllers')

.controller('OrdersShowCtrl', function($scope, $ionicModal) {

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
