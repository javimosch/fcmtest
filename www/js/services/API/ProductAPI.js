angular.module('shopmycourse.services')

.service('ProductAPI', function (API, Configuration) {

    var resource = API(Configuration.apiEndpoint + 'products', {},
    {
        'search': { method: 'GET', url: Configuration.apiEndpoint + 'products', headers: { 'Authorization': 'Bearer' }, cache: false, isArray: true }
    });

    return resource;
});
