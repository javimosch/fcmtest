angular.module('shopmycourse.services')

.factory('HTTPInterceptor', function ($q, $injector) {
    //console.log($injector.get('$state'));

    return {
        request: function (config) {
            var token = window.localStorage.getItem('token');
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
            return response;
        },
        responseError: function (response) {
            if (response && response.data && response.data.error_message) {
              //  $injector.get('toastr').error(response.data.error_message);
            } else {
                switch (response.status) {
                    case 401:
                        if ($injector.get('$state').current.name !== 'app.loginsignup') {
                            //$injector.get('toastr').error("Un problème d'authentification est survenu, essayez de vous reconnecter");
                            $injector.get('$state').go('app.login');
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
