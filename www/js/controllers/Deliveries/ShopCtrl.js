angular.module('shopmycourse.controllers')

.controller('DeliveriesShopCtrl', function($scope, $state, ShopAPI) {
  $scope.shops = [];

  ShopAPI.nearest({}, function (shops) {
    $scope.shops = shops;
  }, function (err) {
    console.error(err);
  });

  $scope.setShop = function (shop_id) {
    $state.go('tabs.scheduledelivery');
  };

})
