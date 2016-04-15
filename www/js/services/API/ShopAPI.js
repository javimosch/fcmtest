angular.module('shopmycourse.services')

.service('ShopAPI', function (API, Configuration) {

    var resource = API(Configuration.apiEndpoint + 'shops', { user_id: '@_user_id' },
    {
        'search': { method: 'GET', url: Configuration.apiEndpoint + 'shops', headers: { 'Authorization': 'Bearer' }, cache: false, isArray: true }
    });

    return resource;
});
