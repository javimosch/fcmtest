angular.module('shopmycourse.services')

.service('AvailabilityAPI', function (API, Configuration) {

    var resource = API(Configuration.apiEndpoint + 'availabilities', { idAvailability: '@idAvailability' },
    {
        'create': { method: 'POST', url: Configuration.apiEndpoint + 'availabilities', headers: { 'Authorization': 'Bearer' }, cache: false },
        'get': { method: 'GET', url: Configuration.apiEndpoint + 'availabilities', headers: { 'Authorization': 'Bearer' }, cache: false, isArray: true },
        'delete': { method: 'DELETE', url: Configuration.apiEndpoint + 'availabilities/:idAvailability', headers: { 'Authorization': 'Bearer' }, cache: false }
    });

    return resource;
});
