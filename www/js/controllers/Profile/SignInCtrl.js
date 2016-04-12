angular.module('shopmycourse.controllers')

.controller('ProfileSignInCtrl', function($scope, $rootScope, $state, toastr, $ionicLoading, Authentication, Validation, CurrentUser, UserAPI) {

  $scope.validation = Validation;

  $scope.init = function () {
    $scope.user = {
      email: '',
      password: ''
    };
  };

  $scope.init();

  $scope.signIn = function () {
    $ionicLoading.show({
      template: 'Nous vérifions vos identifiants...'
    });
    Authentication.login($scope.user, function (correct, errorMessage) {
      if (correct) {
        $scope.init();
        $state.go('tabs.home');
      } else {
        console.error('SignIn error : ' + errorMessage);
      }
    });
  };

  $scope.forgotPassword = function () {
    if (!$scope.user.email || $scope.user.email.length <= 0) {
      toastr.warning('Veuillez rentrer une adresse email valide', 'Mot de passe oublié');
      return;
    }
    $ionicLoading.show({
      template: 'Envoi du mot de passe...'
    });
    UserAPI.forgotPassword({ user: {email: $scope.user.email} }, function (data) {
      toastr.info('Votre mot de passe a été envoyé par email', 'Mot de passe oublié');
      $ionicLoading.hide();
    }, function (err) {
      toastr.warning('Cettre adresse email n\'est pas enregistrée', 'Mot de passe oublié');
      $ionicLoading.hide();
    });
  };
})
