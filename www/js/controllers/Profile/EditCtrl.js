angular.module('shopmycourse.controllers')

.controller('ProfileEditCtrl', function($scope, $state, $ionicHistory, $ionicViewSwitcher, Validation, CurrentUser, UserAPI) {

  $scope.validation = Validation;
  $scope.user = CurrentUser.get().user;

  console.log($scope.user);

  $scope.endEdit = function () {
    UserAPI.update($scope.user, function (correct, errorCode) {
      if (correct) {
        console.log(correct);
        CurrentUser.set($scope.user);
        $state.go('tabs.home');
      } else {
        console.log(errorCode);
      }
    });
  };
})
