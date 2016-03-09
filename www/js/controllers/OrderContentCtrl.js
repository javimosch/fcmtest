angular.module('shopmycourse.controllers')

.controller('OrderContentCtrl', function($scope, $ionicModal) {

  $ionicModal.fromTemplateUrl('Cart.html', {
      scope: $scope,
      animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.cartModal = modal
  });

  $scope.openCartModal = function () {
    $scope.cartModal.show();
  };

  $scope.closeCartModal = function () {
    $scope.cartModal.hide();
  };
})
