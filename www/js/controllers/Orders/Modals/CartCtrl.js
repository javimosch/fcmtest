angular.module('shopmycourse.controllers')

/**
 * @name OrdersCartCtrl
 * @function Controleur
 * @memberOf shopmycourse.controllers
 * @description Édition de la liste des courses
 */

.controller('OrdersCartCtrl', function($rootScope, CurrentOrder, $ionicPopup, $ionicLoading, $scope, $timeout, $state, $stateParams, OrderStore, $ionicModal, CurrentCart, lodash, $interval) {

  var idDeliveryRequestParam = $stateParams.idRequest;
  var idOrderParam = $stateParams.idOrder;

  /**
   * @name $scope.isPending
   * @description Checks if the order is pending
   */
  $scope.isPending = function() {
    return $scope.order && $scope.order.status === 'pending';
  }

  /**
   * @name $scope.saveCart
   * @description Enregistrement de la liste des courses
   */
  $scope.saveCart = function() {
    $ionicLoading.show({
      template: 'Nous enregistrons votre panier...'
    });
    var order = lodash.cloneDeep($scope.order);
    var delivery_contents = [];
    order.total = 0;
    lodash.each($rootScope.currentCart, function(p) {
      var item = {
        id_product: p.id,
        quantity: p.quantity,
        unit_price: p.price
      };
      order.total += item.quantity + item.unit_price;
      delivery_contents.push(item);
    });

    if ($scope.isPending()) {
      order.delivery_request.delivery_contents = delivery_contents;
      OrderStore.saveProductsUsingDeliveryRequest(order, handleUpdateCallback);
    }
    else {
      order.delivery_contents = delivery_contents;
      OrderStore.update(order, handleUpdateCallback);
    }

    function handleUpdateCallback(err, res) {
      if (err) {
        onSaveError(err);
      }
      OrderStore.pull(function(orders) {
        onSave();
      });
    }


    function onSaveError(err) {
      $ionicLoading.hide();
      console.log(err);
    }

    function onSave() {
      if ($scope.isPending()) {
        $state.go('tabs.order_pending', {
          idDeliveryRequest: parseInt(idDeliveryRequestParam)
        });
      }
      else {
        $state.go('tabs.order', {
          idOrder: parseInt(idOrderParam)
        });
      }

      $ionicLoading.hide();
      $scope.closeCartModal();
    }

  };

})
