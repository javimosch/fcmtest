angular.module('shopmycourse.controllers')

/**
 * @name ProfileSignUpCtrl
 * @function Controleur
 * @memberOf shopmycourse.controllers
 * @description Page d'inscription
 */

.controller('ProfileSignUpCtrl', function($scope, $cordovaOauth, $rootScope, $ionicModal, $ionicLoading, $ionicPopup, $state, toastr, Authentication, Validation, CurrentUser,Configuration) {

  /**
   * Initialisation de la validation du formulaire
   */
  $scope.validation = Validation;

  /**
   * Initialisation du formulaire
   */
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

  /**
   * @name $scope.signUp
   * @description Lancement de l'inscription
   */
  $scope.signUp = function() {
    $ionicLoading.show({
      template: 'Nous créons votre compte...'
    });
    Authentication.signup($scope.user, function(correct, errorMessage) {
      $ionicLoading.hide();
      if (correct) {
        console.log('SignUp : Logged');
        $state.go('tabs.home');
      }
      else {
        toastr.warning(errorMessage, 'Authentification');
        console.log('SignUp error : ' + errorMessage);
      }
    });
  };

  /**
   * @name $scope.signUpWithFacebook
   * @description Inscription avec Facebook
   */
  $scope.signUpWithFacebook = function() {


    return;

    $ionicPopup.show({
      templateUrl: 'templates/Profile/ExternalServicesPopup.html',
      title: 'Inscription avec Facebook',
      scope: $scope,
      buttons: [{
        text: 'Retour',
        onTap: function(e) {
          return (true);
        }
      }, {
        text: 'OK',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.user.phone) {
            e.preventDefault();
            toastr.error('Votre numéro de téléphone comporte des erreurs');
          }
          else {

            if (window.facebookConnectPlugin) {
              window.facebookConnectPlugin.login(["email", "public_profile"], function(data) {
                $scope.user.auth_token = data.authResponse.accessToken;
                $scope.user.auth_method = 'facebook';
                $scope.signUp();
              }, function(error) {
                onError('Facebook', error);
              });
            }
            else {
              $cordovaOauth.facebook(document.head.querySelector('meta[data-facebook-app-id]').content, ["email"]).then(function(result) {
                $scope.user.auth_token = result.access_token;
                $scope.user.auth_method = 'facebook';
                $scope.signUp();
              }, function(error) {
                onError('Facebook', error);
              });
            }


            return (true);
          }
        }
      }]
    });
  };

  function onError(providerName, error) {
    toastr.error('Une erreur est survenue lors de l\'inscription via ' + providerName, 'Inscription');
    console.log(providerName + ' signup errors : ', error);
  }

  /**
   * @name $scope.signUpWithGoogle
   * @description Inscription avec Google
   */
  $scope.signUpWithGoogle = function() {
    $ionicPopup.show({
      templateUrl: 'templates/Profile/ExternalServicesPopup.html',
      title: 'Inscription avec Google',
      scope: $scope,
      buttons: [{
        text: 'Retour',
        onTap: function(e) {
          return (true);
        }
      }, {
        text: 'OK',
        type: 'button-positive',
        onTap: function(e) {

          if (!$scope.user.phone) {
            e.preventDefault();
            toastr.error('Votre numéro de téléphone comporte des erreurs');
          }
          else {

            if (window.plugins && window.plugins.googleplus) {
              window.plugins.googleplus.disconnect();
              window.plugins.googleplus.login({
                  'webClientId': Configuration.googleApiKey,
                  'offline': true
                },
                function(data) {
                  $scope.user.id_token = data.idToken;
                  $scope.user.auth_method = 'google';
                  $scope.signUp();
                },
                function(error) {
                  onError('Google', error);
                }
              );
            }
            else {
              $cordovaOauth.google(document.head.querySelector('meta[data-google-app-id]').content, ["email"]).then(function(result) {
                $scope.user.auth_token = result.access_token;
                $scope.user.auth_method = 'google';
                $scope.signUp();
              }, function(error) {
                onError('Google', error);
              });
            }




            return (true);
          }
        }
      }]
    });
  };

  /**
   * @name $scope.signUpWithEmail
   * @description Inscription classique avec email et mot de passe
   */
  $scope.signUpWithEmail = function() {
    $scope.user.auth_method = 'email';
    $scope.signUp();
  };

  /**
   * Affichage des popups CGU et CGU Lemonway
   */
  $ionicModal.fromTemplateUrl('templates/CGU.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openCGU = function() {
    $scope.modal.show();
  };
  $scope.openLemonWayCGU = function() {
    window.open('https://www.lemonway.fr/legal/conditions-generales-d-utilisation', '_system', 'location=yes');
    return false;
  };
  $scope.closeCGU = function() {
    $scope.modal.hide();
  };

})
