angular.module('shopmycourse.controllers')

.controller('ProfileSignUpCtrl', function ($scope, $rootScope, $ionicLoading, $state, Authentication, Validation, CurrentUser) {

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
    $ionicLoading.show({
      template: 'Nous créons votre compte...'
    });
    Authentication.signup($scope.user, function (correct, errorMessage) {
      $ionicLoading.hide();
      if (correct) {
        console.log('SignUp : Logged');
        $state.go('tabs.home');
      } else {
        console.log('SignUp error : ' + errorMessage);
      }
    });
  };
})
