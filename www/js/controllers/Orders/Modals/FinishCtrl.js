angular.module('shopmycourse.controllers')

.controller('OrdersFinishCtrl', function($scope, $ionicSlideBoxDelegate, DeliveryAPI) {
	$scope.ratingStar = 0;


  $scope.disableSwipe = function() {
    $ionicSlideBoxDelegate.enableSlide(false);
  };

  $scope.nextSlide = function () {
    $ionicSlideBoxDelegate.next();
  }

  $scope.finalizeDelivery = function(order) {
	DeliveryAPI.finalize({'idDelivery': order.id, 'validation_code': order.validation_code, 'rating': $scope.ratingStar}, function() {
		$ionicSlideBoxDelegate.next();
	}, function (err) {
		console.error(err);
	});
  }

  $scope.setRatingStar = function(newRating) {
	$scope.ratingStar = newRating;
  }
})
