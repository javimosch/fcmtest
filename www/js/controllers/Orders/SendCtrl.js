angular.module('shopmycourse.controllers')

.controller('OrdersSendCtrl', function($scope, $state, $ionicViewSwitcher, $ionicHistory) {
  $scope.endOrder = function () {
    $ionicHistory.nextViewOptions({
      disableAnimate: false,
      disableBack: true
    });
    $state.go('tabs.orders');
  }
})
