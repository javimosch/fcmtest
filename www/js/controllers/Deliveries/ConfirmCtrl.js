angular.module('shopmycourse.controllers')

.controller('DeliveriesConfirmCtrl', function($scope, $state, $ionicViewSwitcher, $ionicHistory, CurrentDelivery) {
  $scope.endDeliveries = function () {
    //$ionicViewSwitcher.nextDirection('back');
    $ionicHistory.nextViewOptions({
      disableAnimate: false,
      disableBack: true
    });
    CurrentDelivery.clear(function() {
      $state.go('tabs.home');
    });
  }
})
