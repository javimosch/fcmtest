angular.module('shopmycourse.controllers')

.controller('ProfileSignInCtrl', function($scope, $rootScope, $state, $ionicLoading, Authentication, Validation, CurrentUser, UserAPI) {

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

  $scope.forgotPassword = function () {
    if ($scope.user.email.length <= 0) {
      console.log('Mot de passe oublié : Veuillez rentrer une adresse email valide');
      //toastr.info('Veuillez rentrer une adresse email valide', 'Mot de passe oublié');
      return;
    }
    $ionicLoading.show({template: 'Envoi du mot de passe...'});
    UserAPI.forgotPassword({ user: {email: $scope.user.email} }, function (data) {
      console.log('Mot de passe oublié : Votre mot de passe a été envoyé par email');
      //toastr.info('Votre mot de passe a été envoyé par email', 'Mot de passe oublié');
      $ionicLoading.hide();
    });
  };
})
