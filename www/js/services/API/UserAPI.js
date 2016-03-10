angular.module('shopmycourse.services')

.service('UserAPI', function (API, Configuration) {

    var resource = API(Configuration.apiEndpoint + 'users', { idUser: '@idUser' },
    {
        'login': { method: 'GET', url: Configuration.apiEndpoint + 'users/me.json', cache: false },
        'create': { method: 'GET', url: Configuration.apiEndpoint + 'users/me.json', cache: false},
        'update': { method: 'GET', url: Configuration.apiEndpoint + 'users/me.json', headers: { 'Authorization': 'Bearer' }, cache: false },
        'forgotPassword': { method: 'GET', url: Configuration.apiEndpoint + 'users/forgot_password.json', cache: false}
    });

    return resource;
});
