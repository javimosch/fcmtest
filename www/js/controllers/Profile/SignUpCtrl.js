angular.module('shopmycourse.controllers')

.controller('ProfileSignUpCtrl', function ($scope, $rootScope, $ionicModal, $ionicLoading, $state, toastr, Authentication, Validation, CurrentUser) {

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
        toastr.warning(errorMessage, 'Authentification');
        console.log('SignUp error : ' + errorMessage);
      }
    });
  };

  $ionicModal.fromTemplateUrl('templates/CGU.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal;
  });

  $scope.openCGU = function () {
    $scope.modal.show();
  };

  $scope.openLemonWayCGU = function() {
    window.open('https://www.lemonway.fr/legal/conditions-generales-d-utilisation', '_system', 'location=yes');
    return false;
  };

  $scope.closeCGU = function () {
    $scope.modal.hide();
  };

})
