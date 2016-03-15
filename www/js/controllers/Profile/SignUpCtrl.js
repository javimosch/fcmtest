angular.module('shopmycourse.controllers')

.controller('ProfileSignUpCtrl', function ($scope, $rootScope, $state, Authentication, Validation, CurrentUser) {

  $scope.validation = Validation;

  $scope.user = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    phone: '',
    auth_token: '',
    auth_method: ''
  };

  $scope.signUp = function () {
    Authentication.signup($scope.user, function (correct, errorMessage) {
      if (correct) {
        console.log('SignUp : Logged');
        $rootScope.avatarBackground = {"background-image": "url('" + CurrentUser.getAvatar() + "')"};
        $state.go('tabs.home');
      } else {
        console.log('SignUp error : ' + errorMessage);
      }
    });
  };
})
