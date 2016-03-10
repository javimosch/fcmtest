angular.module('shopmycourse.controllers')

.controller('OrdersConfirmCtrl', function($scope, $state, $ionicViewSwitcher, $ionicHistory) {
  $scope.endOrder = function () {
    //$ionicViewSwitcher.nextDirection('back');
    $ionicHistory.nextViewOptions({
      disableAnimate: false,
      disableBack: true
    });
    $state.go('tabs.home');
  }
})
