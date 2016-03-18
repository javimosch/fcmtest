angular.module('shopmycourse.services')

.service('ShopAPI', function (API, Configuration) {

    var resource = API(Configuration.apiEndpoint + 'shops', { user_id: '@_user_id' },
    {
        'nearest': { method: 'GET', url: Configuration.apiEndpoint + 'shops', cache: false, isArray: true }
    });

    return resource;
});
