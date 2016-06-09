angular.module('shopmycourse.controllers')

.controller('DeliveriesFinishCtrl', function($scope, $ionicLoading, $ionicSlideBoxDelegate, $ionicHistory ,$ionicPopup, DeliveryAPI, CurrentAvailability) {
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

  function finalize(delivery, validation_code) {
    $ionicLoading.show({
      template: 'Nous enregistrons votre avis...'
    });
    DeliveryAPI.finalize({'idDelivery': delivery.id, 'validation_code': validation_code, 'rating': $scope.ratingStar}, function() {
      $scope.nextSlide();
			CurrentAvailability.clear();
			$ionicHistory.clearHistory();
      $ionicLoading.hide();
    }, function (err) {
      console.error(err);
      $ionicLoading.hide();
    });
  }

  $scope.finalizeDelivery = function(delivery, validation_code) {

    if (!$scope.ratingStar) {
      var myPopup = $ionicPopup.confirm({
        template: 'Vous n\'avez pas noté l\'acheteur, êtes-vous sûr ?',
        title: 'Ok',
        cancelText: 'retour'
      });

      myPopup.then(function(res) {
        if (res) {
          finalize(delivery, validation_code);
        }
      });
    } else {
      finalize(delivery, validation_code);
    }
  };
});
