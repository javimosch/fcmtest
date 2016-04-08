angular.module('shopmycourse.controllers')

.controller('DeliveriesFinishCtrl', function($scope, $ionicSlideBoxDelegate, DeliveryAPI) {
	$scope.ratingStar = 0;

  $scope.disableSwipe = function() {
    $ionicSlideBoxDelegate.enableSlide(false);
  };

  $scope.nextSlide = function () {
    $ionicSlideBoxDelegate.next();
  }

  $scope.setRatingStar = function(newRating) {
	$scope.ratingStar = newRating;
  }

  $scope.finalizeDelivery = function(delivery, validation_code) {
	DeliveryAPI.finalize({'idDelivery': delivery.id, 'validation_code': validation_code, 'rating': $scope.ratingStar}, function() {
		$scope.nextSlide();
	}, function (err) {
		console.error(err);
	});
  }
})
