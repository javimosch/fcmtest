angular.module('shopmycourse.controllers')

.controller('OrdersShopCtrl', function($rootScope, $scope, $state, ShopAPI) {
  $scope.shops = [];
  $scope.minimumStar = 0;

  function refreshShopList () {
    ShopAPI.nearest({lat: 45.768491, lon: 4.823542, stars: $scope.minimumStar, schedule: $rootScope.currentDelivery.schedule}, function (shops) {
      $scope.shops = shops;
    }, function (err) {
      console.error(err);
    });
  }
  refreshShopList();

  $scope.setShop = function (shop_id) {
    $state.go('tabs.confirmorder');
  };

  $scope.setMinimumStar = function (newValue) {
    $scope.minimumStar = newValue;
    refreshShopList();
  }

})
