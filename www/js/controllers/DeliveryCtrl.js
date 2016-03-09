angular.module('shopmycourse.controllers')

.controller('DeliveryCtrl', function($scope, $ionicModal) {

  $ionicModal.fromTemplateUrl('Confirmation.html', {
      scope: $scope,
      animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.confirmationModal = modal
  });

  $scope.openConfirmationModal = function () {
    $scope.confirmationModal.show();
  };

  $scope.closeConfirmationModal = function () {
    $scope.confirmationModal.hide();
  };
})
