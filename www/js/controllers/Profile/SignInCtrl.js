angular.module('shopmycourse.controllers')

/**
 * @name ProfileSignInCtrl
 * @function Controleur
 * @memberOf shopmycourse.controllers
 * @description Page de connexion
 */

.controller('ProfileSignInCtrl', function($scope, $cordovaOauth, $rootScope, $state, toastr, $ionicLoading, $ionicPopup, $ionicModal, Authentication, Validation, CurrentUser, UserAPI,Configuration) {

  /**
   * Initialisation de la validation du formulaire
   */
  $scope.validation = Validation;

  /**
   * Initialisation du formulaire
   */
  $scope.isSignin = true;
  $scope.init = function() {
    $scope.user = {
      email: '',
      password: ''
    };
  };

  /**
   * @name $scope.signIn
   * @description Lancement de la connexion
   */
  $scope.signIn = function() {
    $ionicLoading.show({
      template: 'Nous vérifions vos identifiants...'
    });
    Authentication.login($scope.user, function(correct, errorMessage) {
      $ionicLoading.hide();

      if (correct) {
        $scope.init();
        $state.go('tabs.home');
      }
      else {
        toastr.warning(errorMessage, 'Authentification');
        console.error('SignIn error : ' + errorMessage);
      }
    });
  };

  $scope.init();

  /**
   * @name $scope.signInWithFacebook
   * @description Connexion avec Facebook
   */
  $scope.signInWithFacebook = function() {
    $ionicPopup.show({
      templateUrl: 'templates/Profile/ExternalServicesPopup.html',
      title: 'Connexion avec Facebook',
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
              $scope.signIn();
            }, function(error) {
              onError('Facebook', error);
            });
          }


          return (true);
        }
      }]
    });
  };

  function onError(providerName, error) {
    toastr.error('ne erreur est survenue lors de la connexion via ' + providerName, 'Connexion');
    console.log(providerName + ' login errors : ', error);
  }

  /**
   * @name $scope.signInWithGoogle
   * @description Connexion avec Google
   */
  $scope.signInWithGoogle = function() {
    $ionicPopup.show({
      templateUrl: 'templates/Profile/ExternalServicesPopup.html',
      title: 'Connexion avec Google',
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


          if (window.plugins && window.plugins.googleplus) {
            window.plugins.googleplus.disconnect();
            window.plugins.googleplus.login({
                'webClientId': Configuration.googleWebClientId,
                'offline': true
              },
              function(data) {
                $scope.user.id_token = data.idToken;
                $scope.user.auth_method = 'google';
                $scope.signIn();
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
              $scope.signIn();
            }, function(error) {
              onError('Google', error);
            });
          }
          return (true);
        }
      }]
    });
  };

  /**
   * @name $scope.signInWithEmail
   * @description Connexion classique avec email et mot de passe
   */
  $scope.signInWithEmail = function() {
    $scope.user.auth_method = 'email';
    $scope.signIn();
  };

  /**
   * @name $scope.forgotPassword
   * @description Ouverture de la popup pour mot de passe oublié
   */
  $scope.forgotPassword = function() {
    if (!$scope.user.email || $scope.user.email.length <= 0) {
      toastr.warning('Veuillez rentrer une adresse email valide', 'Mot de passe oublié');
      return;
    }
    $ionicLoading.show({
      template: 'Envoi du mot de passe...'
    });
    UserAPI.forgotPassword({
      user: {
        email: $scope.user.email
      }
    }, function(data) {
      toastr.info('Votre mot de passe a été envoyé par email', 'Mot de passe oublié');
      $ionicLoading.hide();
    }, function(err) {
      toastr.warning('Cettre adresse email n\'est pas enregistrée', 'Mot de passe oublié');
      $ionicLoading.hide();
    });
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
