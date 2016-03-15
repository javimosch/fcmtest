angular.module('shopmycourse.services')

.service('UserAPI', function (API, Configuration) {

    var resource = API(Configuration.apiEndpoint + 'users', { idUser: '@idUser' },
    {
        'login': { method: 'POST', url: Configuration.apiEndpoint + '/users/sign_in', cache: false },
        'create': { method: 'POST', cache: false},
        'update': { method: 'PUT', headers: { 'Authorization': 'Bearer' }, cache: false },
        'forgotPassword': { method: 'GET', url: Configuration.apiEndpoint + 'users/forgot_password.json', cache: false}
    });

    return resource;
});
