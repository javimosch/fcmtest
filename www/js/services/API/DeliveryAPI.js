angular.module('shopmycourse.services')

.service('DeliveryAPI', function (API, Configuration) {

    var resource = API(Configuration.apiEndpoint + 'deliveries', { idDelivery: '@idDelivery' },
    {
        'mines': { method: 'GET', url: Configuration.apiEndpoint + 'deliveries/mines.json', cache: false, isArray: true },
        'getOne': { method: 'GET', url: Configuration.apiEndpoint + 'deliveries/:idDelivery.json', cache: false }
    });

    return resource;
});
