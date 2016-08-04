angular.module('shopmycourse.controllers')

.controller('OrdersContentCtrl', function($scope, $stateParams, $ionicModal, $timeout, $ionicLoading, OrderStore, ProductAPI, CurrentCart, $state) {

  $scope.currentCartObject = CurrentCart;
  $scope.order = {};
  $scope.products = [];
  var timer = null;

  $ionicLoading.show({
    template: 'Chargement...'
  });

  OrderStore.get({id: parseInt($stateParams.idOrder)}, function (err, order) {
    $scope.order = order[0];
    CurrentCart.initFromLocalStorage($scope.order.id);
    $ionicLoading.hide();
  })

  $ionicModal.fromTemplateUrl('templates/Orders/Modals/Cart.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.cartModal = modal
  });

  $scope.openCartModal = function () {
    $scope.cartModal.show();
  };

  $scope.closeCartModal = function () {
    $scope.cartModal.hide();
  };

  $scope.search = function (query) {
    if (timer) {
      $timeout.cancel(timer);
    }
    timer = $timeout(function getProduct() {
      $ionicLoading.show({
        template: 'Nous recherchons les produits correspondants à votre recherche...'
      });
      ProductAPI.search({q: query, shop_id: $scope.order.shop.id}, function (products) {
        $scope.products = products;
        $ionicLoading.hide();
      });
    }, 700);
  };

  $scope.goBack = function() {
    $state.go('tabs.order', {idOrder: $stateParams.idOrder});
  };

  $scope.addProduct = CurrentCart.addProduct;
  $scope.removeProduct = CurrentCart.removeProduct;

})
