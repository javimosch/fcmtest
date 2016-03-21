angular.module('shopmycourse.controllers')

.controller('ProfileShowCtrl', function($scope, $state, Authentication, CurrentUser) {

  $scope.user = {};
  CurrentUser.get(function (user) {
      $scope.user = user;
  })

  $scope.avatar = null;
  CurrentUser.getAvatar(function (avatar) {
    $scope.avatar = avatar;
  });


  $scope.logout = function () {
    Authentication.logout(function() {
      $state.go('start');
    });
  }
})
