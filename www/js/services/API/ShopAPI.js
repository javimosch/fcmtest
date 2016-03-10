angular.module('shopmycourse.services')

.service('ShopAPI', function (API, Configuration) {

    var resource = API(Configuration.apiEndpoint + 'shops', { idShop: '@idShop' },
    {
        'nearest': { method: 'GET', url: Configuration.apiEndpoint + 'shops/nearest.json', cache: false, isArray: true }
    });

    return resource;
});
