angular.module('shopmycourse.services')

.service('DeliveryAPI', function (API, Configuration) {

    var resource = API(Configuration.apiEndpoint + 'deliveries', { idDelivery: '@idDelivery' },
    {
        'deliveries': { method: 'GET', url: Configuration.apiEndpoint + 'deliveries', headers: { 'Authorization': 'Bearer' }, cache: false, isArray: true },
        'orders': { method: 'GET', url: Configuration.apiEndpoint + 'orders', headers: { 'Authorization': 'Bearer' }, cache: false, isArray: true }
    });

    return resource;
});
