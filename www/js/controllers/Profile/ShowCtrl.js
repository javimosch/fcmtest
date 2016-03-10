angular.module('shopmycourse.controllers')

.controller('ProfileShowCtrl', function($scope, $state, Authentication, CurrentUser) {

  $scope.user = CurrentUser.get();

  $scope.logout = function () {
    Authentication.logout(function() {
      $state.go('start');
    });
  }
})
