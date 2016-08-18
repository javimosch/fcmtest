angular.module('shopmycourse.services')

.service('UserAPI', function (API, Configuration) {

    var resource = API(Configuration.apiEndpoint + 'users', { idUser: '@idUser' },
    {
        'getWallet': { method: 'GET', url: Configuration.apiEndpoint + 'wallets/:idUser/value', headers: { 'Authorization': 'Bearer' }, cache: false },
        'login': { method: 'POST', url: Configuration.apiEndpoint + 'users/sign_in', cache: false },
        'create': { method: 'POST', cache: false},
        'update': { method: 'PUT', headers: { 'Authorization': 'Bearer' }, cache: false },
        'forgotPassword': { method: 'POST', url: Configuration.apiEndpoint + 'users/password', cache: false}
    });

    return resource;
});
