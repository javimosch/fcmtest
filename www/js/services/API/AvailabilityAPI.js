angular.module('shopmycourse.services')

.service('AvailabilityAPI', function (API, Configuration) {

    var resource = API(Configuration.apiEndpoint + 'availabilities', { idAvailability: '@idAvailability' },
    {
        'create': { method: 'POST', url: Configuration.apiEndpoint + 'availabilities', cache: false }
    });

    return resource;
});
