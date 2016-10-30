angular.module('shopmycourse.services')

.service('CurrentOrder', function(OrderStore, lodash) {
  var self = {};
  var _order = null;

  function fetchProducts(callback) {
    if (!self.exists()) return callback && callback('CurrentOrder: Object has not been initialized', null);
    OrderStore.fetchProducts(_order, function(_err, delivery_contents) {
      if (_err) {
        console.log(_err);
        return callback && callback(_err, delivery_contents);
      }
      else {
        return callback && callback(_err, delivery_contents);
      }
    });
  }

  function calculatePricing(total, callback) {
    OrderStore.calculateCommission({
      total: total
    }, function(err, res) {
      if (err) return console.warn('calculateCommission', err);
      var commission = res.commission;
      OrderStore.calculateShippingTotal({
        total: total
      }, function(err, r) {
        if (err) return console.warn('calculateShippingTotal', err);
        callback({
          shipping_total: r.shipping_total,
          commission: commission
        });
      })
    })
  }



  function calculateTotal(delivery_contents) { /*subtotal*/
    var total = 0;
    delivery_contents.forEach(function(c) {
      total += c.unit_price * c.quantity;
    })
    return total;
  };


  self.fetch = function(params, callback) {

    if (params.id) {

      OrderStore.get({
        id: parseInt(params.id)
      }, function(err, res) {

        if (err) {
          console.log('WARN CurrentOrder (fetch delivery): ' + err);
        }

        /*
         * OrderStore pull may bring an array ?
         */
        if (typeof res.length != 'undefined') {
          res = res[0];
        }
        self.set(res);
        self.update();
        callback && callback(err, res);
      }, callback);
    }
    else {

      if (params.idDeliveryRequest) {
        var order = null;
        OrderStore.pull(function(err, orders) {

          if (err) {
            console.log('WARN CurrentOrder (fetch request): ' + err);
          }

          console.log('CurrentOrder (fetch request): rta ', err, orders);

          if (!orders || err) return callback(err, null);
          orders.forEach(function(_order) {
            if (_order.delivery_request.id == parseInt(params.idDeliveryRequest)) {
              order = _order;
            }
          });
          if (order) {
            self.set(order);
            self.update();
            callback && callback(err, order);
          }
          else {
            console.log('WARN CurrentOrder (fetch request): request not found..');
            callback('DeliveryRequest not found.');
          }
        }, callback);
      }

    }

  };



  self.id = function() {
    return _order && parseInt(_order.id);
  }
  self.deliveryRequestId = function() {
    return _order && _order.delivery_request && parseInt(_order.delivery_request.id);
  };
  self.isPending = function() {
    return _order && _order.status === 'pending';
  }
  self.clear = function() {
    _order = null;
  }
  self.exists = function(optionalOrderId, optionalDeliveryRequestId) {
    //if no arguments provided, returns true if has an order object.
    if (!optionalOrderId && !optionalDeliveryRequestId || !_order) {
      return _order != null;
    }
    //if order id provided, returns true if match
    if (optionalOrderId) {
      return _order && _order.id && _order.id == optionalOrderId;
    }
    //if delivery request id provided, return true if match
    if (optionalDeliveryRequestId) {
      return _order && _order.id && _order.delivery_request.id == optionalDeliveryRequestId;
    }
  }


  /*fetch products (with images), total and commission*/
  self.update = function(callback) {
    fetchProducts(function(err, delivery_contents) {
      if (err) return console.log('WARN', err);
      var total = calculateTotal(delivery_contents);
      calculatePricing(total, function(pricing) {
        _order.delivery_contents = delivery_contents;
        _order.total = total;
        _order.commission = pricing.commission;
        _order.shipping_total = pricing.shipping_total;
        if (callback) callback(_order);
      });
    });
  }



  self.set = function(__order) {
    _order = __order;
    console.log('CurrentOrder set', __order);
  };
  self.get = function() {

    self.update();

    return _order;
  };
  window.CurrentOrder = self;
  return self;
});
