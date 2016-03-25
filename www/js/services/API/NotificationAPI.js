angular.module('shopmycourse.services')

.service('NotificationAPI', function (API, Configuration) {

    var resource = API(Configuration.apiEndpoint + 'notifications', { idNotification: '@idNotification' },
    {
        'get': { method: 'GET', url: Configuration.apiEndpoint + 'notifications', headers: { 'Authorization': 'Bearer' }, cache: false, isArray: true },
        'update': { method: 'PUT', url: Configuration.apiEndpoint + 'notifications/:idNotification', headers: { 'Authorization': 'Bearer' }, cache: false }
    });

    return resource;
});
