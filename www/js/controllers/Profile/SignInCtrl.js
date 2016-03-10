angular.module('shopmycourse.controllers')

.controller('ProfileSignInCtrl', function($scope, $state, Authentication, Validation) {

  $scope.validation = Validation;

  $scope.user = {
    email: 'john@deau.com',
    password: 'password'
  };

  $scope.signIn = function () {
    Authentication.login($scope.user, function (user) {
      $state.go('tabs.home');
    }, function (err) {
      console.error(err);
    })
  };
})
