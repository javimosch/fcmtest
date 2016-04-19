angular.module('shopmycourse.controllers')

.controller('OrdersFinishCtrl', function($scope, $ionicLoading, $ionicSlideBoxDelegate, DeliveryAPI) {
	$scope.ratingStar = 0 || $scope.order.buyer_rating;

  $scope.disableSwipe = function() {
    $ionicSlideBoxDelegate.enableSlide(false);
  };

  $scope.nextSlide = function () {
    $ionicSlideBoxDelegate.next();
  }

  $scope.finalizeDelivery = function(order) {
		$ionicLoading.show({
	    template: 'Nous enregistrons votre avis...'
	  });
		DeliveryAPI.finalize({'idDelivery': order.id, 'rating': $scope.ratingStar}, function() {
			$ionicLoading.hide();
			$ionicSlideBoxDelegate.next();
		}, function (err) {
			console.error(err);
			$ionicLoading.hide();
		});
  };

  $scope.setRatingStar = function(newRating) {
		$scope.ratingStar = newRating;
  };
})
