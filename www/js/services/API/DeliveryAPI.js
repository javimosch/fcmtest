angular.module('shopmycourse.services')

.service('DeliveryAPI', function (API, Configuration) {

    var resource = API(Configuration.apiEndpoint + 'deliveries', { idDelivery: '@idDelivery' },
    {
        'deliveries': { method: 'GET', url: Configuration.apiEndpoint + 'deliveries', headers: { 'Authorization': 'Bearer' }, cache: false, isArray: true },
        'orders': { method: 'GET', url: Configuration.apiEndpoint + 'orders', headers: { 'Authorization': 'Bearer' }, cache: false, isArray: true },
        'create': { method: 'POST', url: Configuration.apiEndpoint + 'deliveries', headers: { 'Authorization': 'Bearer' }, cache: false },
        'update': { method: 'PUT', url: Configuration.apiEndpoint + 'deliveries/:idDelivery', headers: { 'Authorization': 'Bearer' }, cache: false },
        'confirm': { method: 'POST', url: Configuration.apiEndpoint + 'deliveries/:idDelivery/confirm', headers: { 'Authorization': 'Bearer' }, cache: false },
        'finalize': { method: 'POST', url: Configuration.apiEndpoint + 'deliveries/:idDelivery/finalize', headers: { 'Authorization': 'Bearer' }, cache: false }
    });

    return resource;
});
