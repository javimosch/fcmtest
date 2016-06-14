angular.module('shopmycourse.controllers')

.controller('OrdersFinishCtrl', function($scope, $ionicLoading, $ionicSlideBoxDelegate, $ionicPopup, $ionicHistory, DeliveryAPI, CurrentDelivery) {

  $scope.disableSwipe = function() {
    $ionicSlideBoxDelegate.enableSlide(false);
  };

  $scope.nextSlide = function () {
    $ionicSlideBoxDelegate.next();
  }

	function finalize(order) {
		$ionicLoading.show({
			template: 'Nous enregistrons votre avis...'
		});
		DeliveryAPI.finalize({
			'idDelivery': order.id,
			'rating': $scope.ratingStar
		}, function() {
			$ionicLoading.hide();
      CurrentDelivery.clear();
      $ionicHistory.clearHistory();
			$ionicSlideBoxDelegate.next();
		}, function(err) {
			console.error(err);
			$ionicLoading.hide();
		});
	}

  $scope.finalizeDelivery = function(order) {
		if (!$scope.ratingStar) {
			var myPopup = $ionicPopup.confirm({
				template: 'Vous n\'avez pas noté le livreur, êtes-vous sûr ?',
				title: 'Ok',
				cancelText: 'retour'
			});

			myPopup.then(function(res) {
				if (res) {
					finalize(order);
				}
			});
		}
		else {
			finalize(order);
		}
  };

  $scope.setRatingStar = function(newRating) {
		if(!$scope.order.buyer_rating) {
			$scope.ratingStar = newRating;
		}
  };
})
