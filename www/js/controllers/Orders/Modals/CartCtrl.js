angular.module('shopmycourse.controllers')

.controller('OrdersCartCtrl', function($rootScope, $scope, $timeout, $state, $stateParams, OrderStore, $ionicModal, CurrentCart, lodash, $interval, CurrentUser) {

  $scope.order = {};
  $scope.user = {};

  OrderStore.get({id: parseInt($stateParams.idOrder)}, function (err, order) {
    $scope.order = order[0];
    CurrentCart.initFromOrder($scope.order);
  })

  CurrentUser.get(function(user) {
    $scope.user = user;
  })

  $scope.saveCart = function () {
    var order = lodash.cloneDeep($scope.order);
    order.delivery_contents = [];
    order.total = 0;
    lodash.each($rootScope.currentCart, function (p) {
      var item = {
        id_product: p.id,
        quantity: p.quantity,
        unit_price: p.price
      };
      order.total += item.quantity + item.unit_price;
      order.delivery_contents.push(item);
    });
    OrderStore.update(order, function (err, order) {
      if (err) {
        console.debug(err);
        return;
      }
      OrderStore.pull(function (orders) {
        if ($scope.user.wallet.lemonway_card_id) {
            $state.go('tabs.order', {idOrder: parseInt($stateParams.idOrder)});
        }
        else {
            $state.go('tabs.editcreditcard');
        }

        $scope.closeCartModal();
      });
    })
  };

})
