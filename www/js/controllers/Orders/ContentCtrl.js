angular.module('shopmycourse.controllers')

.controller('OrdersContentCtrl', function($scope, $ionicModal) {
  
  $ionicModal.fromTemplateUrl('templates/Orders/Modals/Cart.html', {
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
