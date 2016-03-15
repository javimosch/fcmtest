angular.module('shopmycourse.controllers')

.controller('ProfileSignInCtrl', function($scope, $rootScope, $state, Authentication, Validation, CurrentUser) {

  $scope.validation = Validation;

  $scope.init = function () {
    $scope.user = {
      email: '',
      password: ''
    };
  };

  $scope.init();

  $scope.signIn = function () {
    Authentication.login($scope.user, function (correct, errorMessage) {
      if (correct) {
        console.log('SignIn : Logged');
        $rootScope.avatarBackground = {"background-image": "url('" + CurrentUser.getAvatar() + "')"};
        $state.go('tabs.home');
        $scope.init();
      } else {
        console.error('SignIn error : ' + errorMessage);
      }
    });
  };
})
