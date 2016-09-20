angular.module('shopmycourse.controllers')

/**
 * @name OrdersContentCtrl
 * @function Controleur
 * @memberOf shopmycourse.controllers
 * @description Édition de la liste de course
 */

.controller('OrdersContentCtrl', function($scope, CurrentOrder, $stateParams, $stateHistory, $ionicModal, $timeout, $ionicLoading, OrderStore, ProductAPI, CurrentCart, $state) {

  $scope.currentCartObject = CurrentCart;
  $scope.order = {};
  $scope.products = [];
  var timer = null;


  var idDeliveryRequestParam = $stateParams.idRequest;
  var idOrderParam = $stateParams.idOrder;
  $scope.order = CurrentOrder.get();

  if (CurrentOrder.exists(idOrderParam,idDeliveryRequestParam)) {
    //if the order exists the user came from show view. We must load the cart
    moveProductsToCurrentCart($scope.order);
  }
  else {
    /**
     * Affichage du message de chargement pour la liste de course
     */
    $ionicLoading.show({
      template: 'Chargement ...'
    });

    CurrentOrder.fetch({
      id: idOrderParam,
      idDeliveryRequest: idDeliveryRequestParam
    }, function(err, _order) {
      $scope.order = _order
      moveProductsToCurrentCart(_order);
      $ionicLoading.hide();
    });
  }


  /**
   * Chargement du panier actuel
   */
  function moveProductsToCurrentCart(order) {
    if (typeof order.delivery_contents == 'undefined' || order.delivery_contents.length == 0) {
      if (order.status !== 'pending') {
        CurrentCart.initFromLocalStorage(order.id);
      }
      else {
        CurrentCart.initFromLocalStorage(order.delivery_request.id, true);
      }
    }
    else {
      CurrentCart.initFromOrder(order);
    }
  }



  /**
   * Affichage de la popup liste de course
   */
  $ionicModal.fromTemplateUrl('templates/Orders/Modals/Cart.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.cartModal = modal
  });
  $scope.openCartModal = function() {
    $scope.cartModal.show();
  };
  $scope.closeCartModal = function() {
    $scope.cartModal.hide();
  };

  /**
   * @name $scope.search
   * @description Recherche de produits pour les ajouter à la liste de course
   */
  $scope.search = function(query) {
    if (timer) {
      $timeout.cancel(timer);
    }
    timer = $timeout(function getProduct() {
      $ionicLoading.show({
        template: 'Nous recherchons les produits correspondants à votre recherche...'
      });
      ProductAPI.search({
        q: query,
        shop_id: $scope.order.shop.id
      }, function(products) {
        $scope.products = products;
        $ionicLoading.hide();
      }, function(a, b, c) {
        console.warn(a, b, c);
        $ionicLoading.hide();
      });
    }, 700);
  };

  /**
   * @name $scope.goBack
   * @description Retour sur la page de la commande
   */
  $scope.goBack = function() {
    if(CurrentOrder.isPending()){
      $state.go('tabs.order_pending', {
        idRequest: $stateParams.idRequest
      });
    }else{
      $state.go('tabs.order', {
        idOrder: $stateParams.idOrder
      });
    }
  };

  /**
   * Fonctions qui permettent l'ajout/suppression d'un produit à la liste de course
   */
  $scope.addProduct = CurrentCart.addProduct;
  $scope.removeProduct = CurrentCart.removeProduct;

})
