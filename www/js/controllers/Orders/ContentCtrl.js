angular.module('shopmycourse.controllers')

.controller('OrdersContentCtrl', function($scope, $stateParams, $ionicModal, $timeout, $ionicLoading, OrderStore, ProductAPI, CurrentCart) {

  $scope.currentCartObject = CurrentCart;
  $scope.order = {};
  $scope.products = [];
  var timer = null;

  OrderStore.get({id: parseInt($stateParams.idOrder)}, function (err, order) {
    $scope.order = order[0];
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
        document.getElementsByClassName('results-title')[0].style.display = 'block';
        $scope.products = products;
        $ionicLoading.hide();
      });
    }, 700);
  };

  $scope.addProduct = CurrentCart.addProduct;
  $scope.removeProduct = CurrentCart.removeProduct;
})
