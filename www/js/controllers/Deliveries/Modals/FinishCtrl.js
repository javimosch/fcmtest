angular.module('shopmycourse.controllers')

.controller('DeliveriesFinishCtrl', function($scope, $ionicSlideBoxDelegate) {

  $scope.disableSwipe = function() {
    $ionicSlideBoxDelegate.enableSlide(false);
  };

  $scope.nextSlide = function () {
    $ionicSlideBoxDelegate.next();
  }
})
