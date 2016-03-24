angular.module('shopmycourse.services')

.service('NotificationAPI', function (API, Configuration) {

    var resource = API(Configuration.apiEndpoint + 'notifications', { user_id: '@_user_id' },
    {
        'get': { method: 'GET', url: Configuration.apiEndpoint + 'notifications', headers: { 'Authorization': 'Bearer' }, cache: false, isArray: true }
    });

    return resource;
});
