angular.module('shopmycourse.controllers')

.controller('ProfileSignUpCtrl', function ($scope, $state, Authentication) {
  $scope.user = {
    firstname: 'John',
    lastname: 'D\'eau',
    email: 'john@deau.com',
    password: 'password',
    phone: '+336012345678',
  };

  $scope.signUp = function () {
    Authentication.signup($scope.user, function (user) {
      $state.go('tabs.home');
    }, function (err) {
      console.error(err);
    })
  };
})
