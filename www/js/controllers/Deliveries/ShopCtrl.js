angular.module('shopmycourse.controllers')

.controller('DeliveriesShopCtrl', function($scope, $state, ShopAPI, CurrentAvailability) {
  $scope.shops = [];
  ShopAPI.nearest({lat: 45.768491, lon: 4.823542}, function (shops) {
    $scope.shops = shops;
  }, function (err) {
    console.error(err);
  });

  $scope.setShop = function (shop) {
    CurrentAvailability.setShop(shop, function () {
      $state.go('tabs.scheduledelivery');
    });
  };

})
