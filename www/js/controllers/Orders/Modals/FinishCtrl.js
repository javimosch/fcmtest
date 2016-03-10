angular.module('shopmycourse.controllers')

.controller('OrdersFinishCtrl', function($scope, $ionicSlideBoxDelegate) {

  $scope.disableSwipe = function() {
    $ionicSlideBoxDelegate.enableSlide(false);
  };

  $scope.nextSlide = function () {
    $ionicSlideBoxDelegate.next();
  }
})
