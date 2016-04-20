angular.module('shopmycourse.services')

.factory('HTTPInterceptor', function ($q, $injector, Configuration) {
  var token = 'Fetching...';
  // CurrentUser = $injector.get('CurrentUser');
  // CurrentUser.getToken(function (tokenFromStorage) {
  //   token = tokenFromStorage;
  // });

  return {
    setToken: function (tokenFromStorage) {
      token = tokenFromStorage;
    },
    request: function (config) {
      if (config.headers.Authorization === 'Bearer') {
        config.headers.Authorization = 'Bearer ' + token;
      }
      config.headers.ContentType = 'application/json'
      return config;
    },
    requestError: function (rejection) {
      return $q.reject(rejection);
    },
    response: function (response) {
      if (response && response.data && response.data.notice) {
        //$injector.get('toastr').success(Configuration.success[response.data.notice]);
      }
      return response;
    },
    responseError: function (response) {
      if (response && response.data && response.data.notice) {
        if (Configuration.errors[response.data.notice]) {
          $injector.get('toastr').error(Configuration.errors[response.data.notice]);
        } else {
          $injector.get('toastr').error(response.data.notice || 'Une erreur inconnue est survenue');
        }

      } else {
        switch (response.status) {
          case 401:
            if ($injector.get('$state').current.name !== 'start') {
              $injector.get('toastr').error("Un problème d'authentification est survenu, essayez de vous reconnecter");
              $injector.get('$state').go('start');
              $injector.get("Authentication").logout();
              $injector.get("$ionicLoading").hide();
            }
          case 403:
            //$injector.get('toastr').error('Un problème d\'authentification est survenu', 'Erreur');
          break;
          default:
            //$injector.get('toastr').error('Une erreur inconnue est survenu. Informez-nous si cela se reproduit.', 'Erreur');
          break;
        }
      }
      //$injector.get("HTTPLoading").hide();
      return $q.reject(response);
    }
  };
});
