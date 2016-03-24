angular.module('shopmycourse.services')

.service('DeliveryRequestAPI', function (API, Configuration) {

    var resource = API(Configuration.apiEndpoint + 'delivery_requests', { idDeliveryRequest: '@idDeliveryRequest' },
    {
        'create': { method: 'POST', url: Configuration.apiEndpoint + 'delivery_requests', headers: { 'Authorization': 'Bearer' }, cache: false }
    });

    return resource;
});
