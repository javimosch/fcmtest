angular.module('shopmycourse.controllers')

.controller('EditProfileCtrl', function($scope, $state, $ionicHistory, $ionicViewSwitcher) {
  $scope.endEdit = function () {
    $ionicViewSwitcher.nextDirection('back');
    $ionicHistory.nextViewOptions({
      disableAnimate: false,
      disableBack: true
    });
    $state.go('tabs.profile');
  }
})
