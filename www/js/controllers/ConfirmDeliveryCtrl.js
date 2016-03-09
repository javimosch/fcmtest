angular.module('shopmycourse.controllers')

.controller('ConfirmDeliveryCtrl', function($scope, $ionicSlideBoxDelegate) {

  $scope.disableSwipe = function() {
    $ionicSlideBoxDelegate.enableSlide(false);
  };

  $scope.nextSlide = function () {
    $ionicSlideBoxDelegate.next();
  }
})
