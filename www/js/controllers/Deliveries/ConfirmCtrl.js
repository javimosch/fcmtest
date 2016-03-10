angular.module('shopmycourse.controllers')

.controller('DeliveriesConfirmCtrl', function($scope, $state, $ionicViewSwitcher, $ionicHistory) {
  $scope.endDeliveries = function () {
    //$ionicViewSwitcher.nextDirection('back');
    $ionicHistory.nextViewOptions({
      disableAnimate: false,
      disableBack: true
    });
    $state.go('tabs.home');
  }
})
