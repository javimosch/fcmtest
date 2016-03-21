angular.module('shopmycourse.controllers')

.controller('OrdersShopCtrl', function($scope, $state, ShopAPI) {
  $scope.shops = [];
  $scope.minimumStar = 0;

  ShopAPI.nearest({lat: 45.768491, lon: 4.823542, stars: 4}, function (shops) {
    $scope.shops = shops;
  }, function (err) {
    console.error(err);
  });

  $scope.setShop = function (shop_id) {
    $state.go('tabs.confirmorder');
  };

  $scope.setMinimumStar = function (newValue) {
    $scope.minimumStar = newValue;
  }

})
