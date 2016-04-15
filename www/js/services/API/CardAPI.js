angular.module('shopmycourse.services')

.service('CardAPI', function (API, Configuration) {

    var resource = API(Configuration.apiEndpoint + 'wallets', { idUser: '@idUser' },
    {
        'get': { method: 'GET', url: Configuration.apiEndpoint + 'wallets/:idUser', headers: { 'Authorization': 'Bearer' }, cache: false },
        'update': { method: 'PUT', url: Configuration.apiEndpoint + 'wallets/:idUser', headers: { 'Authorization': 'Bearer' }, cache: false }
    });

    return resource;
});
