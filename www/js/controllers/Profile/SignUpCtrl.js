angular.module('shopmycourse.controllers')

.controller('ProfileSignUpCtrl', function ($scope, $rootScope, $ionicModal, $ionicLoading, $ionicPopup, $state, toastr, Authentication, Validation, CurrentUser) {

  $scope.validation = Validation;

  $scope.isSignup = true;

  $scope.user = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    phone: '',
    auth_token: '',
    auth_method: ''
  };

  $scope.signUp = function() {
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

  $scope.signUpWithFacebook = function () {
    $ionicPopup.show({
      templateUrl: 'templates/Profile/ExternalServicesPopup.html',
      title: 'Inscription avec Facebook',
      scope: $scope,
      buttons: [
        { text: 'Retour' },
        {
          text: 'OK',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.user.phone) {
              e.preventDefault();
              toastr.error('Votre numéro de téléphone comporte des erreurs');
            } else {
              return (true);
            }
          }
        }
      ]
    }).then(function (res) {
      if (res) {
        facebookConnectPlugin.login(["email", "public_profile"], function(data) {
            $scope.user.auth_token = data.authResponse.accessToken;
            $scope.user.auth_method = 'facebook';
            $scope.signUp();
        }, function(error) {
            toastr.error('Une erreur est survenue lors de l\'inscription via Facebook', 'Inscription');
            console.log('Facebook signup errors : ', error);
        });
      }
    });
  };


  $scope.signUpWithGoogle = function () {
    $ionicPopup.show({
      templateUrl: 'templates/Profile/ExternalServicesPopup.html',
      title: 'Inscription avec Google',
      scope: $scope,
      buttons: [
        { text: 'Retour' },
        {
          text: 'OK',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.user.phone) {
              e.preventDefault();
              toastr.error('Votre numéro de téléphone comporte des erreurs');
            } else {
              return (true);
            }
          }
        }
      ]
    }).then(function (res) {
      if (res) {
        window.plugins.googleplus.login(
            {
              'webClientId': '979481548722-mj63ev1utfe9v21l5pdiv4j0t1v7jhl2.apps.googleusercontent.com',
              'offline': true
            },
            function (data) {
              $scope.user.auth_token = data.serverAuthCode;
              $scope.user.auth_method = 'google';
              $scope.signUp();
            },
            function (error) {
              toastr.error('Une erreur est survenue lors de l\'inscription via Google', 'Inscription');
              console.log('Google signup errors : ', error);
            }
        );
      }
    });
  };

  $scope.signUpWithEmail = function () {
    $scope.user.auth_method = 'email';
    $scope.signUp();
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
