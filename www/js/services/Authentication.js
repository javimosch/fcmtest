angular.module('shopmycourse.services')

.service('Authentication', function ($window, $localstorage, $state, $rootScope, UserAPI, toastr, CurrentUser) {
    return {
        login: function (user, next) {
            UserAPI.login({email: user.email, password: user.password, auth_token: user.auth_token, auth_method: user.auth_method}, function (data) {
                CurrentUser.setLogged(true);
                CurrentUser.set(data);
                CurrentUser.setToken(data.token);
                return next(true);
            }, function(error) {
                //toastr.error("Problème d'authentification, vérifiez votre email et votre mot de passe.", 'Authentification');
            });
        },
        signup: function (user, next) {
            UserAPI.create(user, function (data) {
                CurrentUser.setLogged(true);
                CurrentUser.set(data);
                CurrentUser.setToken(data.token);
                return next(true);
            }, function(error) {
              if (error.data.errors) {
                if (error.data.errors.email) {
                  return next(false, "Cet email est déjà utilisé sur Shop My Course");
                }
              } else if (error.data.error_message) {
                return next(false, error.data.error_message);
              }
              return next(false, "Une erreur inconnue est survenue lors de votre inscription");
            });
        },
        logout: function (next) {
            CurrentUser.setLogged(false);
            CurrentUser.set(null);
            $window.localStorage.clear();
            setTimeout(next, 500);
        }
    };
});
