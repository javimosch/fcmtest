angular.module('shopmycourse.controllers')

.controller('ProfileEditCtrl', function($scope, $state, $ionicHistory, $ionicViewSwitcher, Validation, CurrentUser, UserAPI) {

  $scope.validation = Validation;

  $scope.user = {};
  CurrentUser.get(function (user) {
      $scope.user = user;
  })

  $scope.avatar = null;
  CurrentUser.getAvatar(function (avatar) {
    $scope.avatar = avatar;
  });

  $scope.endEdit = function () {
    UserAPI.update($scope.user, function (correct, errorCode) {
      if (correct) {
        CurrentUser.set($scope.user, function () {
          $ionicHistory.nextViewOptions({
            disableAnimate: false,
            disableBack: true
          });
          $state.go('tabs.profile');
        });
      } else {
        console.log(errorCode);
      }
    });
  };
})
