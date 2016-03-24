angular.module('shopmycourse.controllers')

.controller('DeliveriesShopCtrl', function($scope, $state, $ionicLoading, $cordovaGeolocation, toastr, ShopAPI, CurrentAvailability) {

  $ionicLoading.show({
    template: 'Nous recherchons les magains à proximité...'
  });

  $scope.shops = [];

  var posOptions = {
    timeout: 10000,
    enableHighAccuracy: true
  };

  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      ShopAPI.nearest({lat: position.coords.latitude, lon: position.coords.longitude}, function (shops) {
        $scope.shops = shops;
        $ionicLoading.hide();
      }, function (err) {
        toastr.warning('Une erreur est survenue lors de la récupération des magasins à proximité', 'Attention');
        $ionicLoading.hide();
      });
    }, function(err) {
      toastr.warning('Nous n\'arrivons pas à vous géolocaliser', 'Attention');
      $ionicLoading.hide();
    });

  $scope.setShop = function (shop) {
    CurrentAvailability.setShop(shop, function () {
      $state.go('tabs.scheduledelivery');
    });
  };

})
