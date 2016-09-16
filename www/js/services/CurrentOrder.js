angular.module('shopmycourse.services')

.service('CurrentOrder', function(OrderStore, lodash) {
  var self = {};
  var _order = null;


  function resolveFetch(err, order, callback) {
    if (err) {
      return callback(err, order);
    }

    /*
     * Set the CurrentOrder order.
     */
    self.set(order);
    /**
     * Insert delivery_contents into the order by deliveryRequest association (only if pending)
     */
    if (order.status == 'pending') {
      self.fetchProducts(callback);
    }
    else {
      return callback(err, order);
    }
  }


  self.fetch = function(params, callback) {

    if (params.id) {

      OrderStore.get({
        id: parseInt(params.id)
      }, function(err, res) {
        /*
         * OrderStore pull may bring an array ?
         */
        if (typeof err, res.length != 'undefined') {
          res = res[0];
        }

        return resolveFetch(err, res, callback)
      }, callback);
    }
    else {

      if (params.idDeliveryRequest) {
        var order = null;
        OrderStore.pull(function(err, orders) {
          if (!orders || err) return callback(err, null);
          orders.forEach(function(_order) {
            if (_order.delivery_request.id == parseInt(params.idDeliveryRequest)) {
              order = _order;
            }
          });

          if (order) {
            return resolveFetch(null, order, callback);
          }

        }, callback);
      }

    }

  };

  self.fetchProducts = function(callback) {
    if (!self.exists()) return callback && callback('CurrentOrder: Object has not been initialized', null);
    OrderStore.fetchProducts(_order, function(_err, delivery_contents) {
      if (_err) {
        console.log(_err);
        return callback && callback(_err, _order);
      }
      else {
        _order.delivery_contents = delivery_contents;

        var total = 0;
        _order.delivery_contents.forEach(function(c) {
          total += c.unit_price * c.quantity;
        })
        _order.total = total;

        return callback && callback(_err, _order);
      }
    });
  }

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
  
  self.updateProductsAsync = function(){
    self.fetchProducts();
  }
  /*unused*/
  self.setProducts = function(delivery_contents) {
    _order.delivery_contents = delivery_contents;
  };
  
  self.merge = function(source) {
    lodash.merge(_order, [source]);
    self.set(_order);
    self.updateProductsAsync();
  }
  self.set = function(__order) {
    console.log('CurrentOrder set', __order);
    _order = __order;
  };
  self.get = function() {
    return _order;
  };
  return self;
});