angular.module('shopmycourse.controllers')

.controller('DeliveriesShopCtrl', function($scope, $state, $ionicLoading, $ionicPopup, $cordovaGeolocation, toastr, ShopAPI, CurrentAvailability, $timeout) {

  $ionicLoading.show({
    template: 'Nous recherchons les magasins à proximité...'
  });

  $scope.shops = [];
  $scope.address = "";
  var timer = null;

  var posOptions = {
    timeout: 10000,
    enableHighAccuracy: true
  };

  function refreshShopList() {
    $ionicLoading.show({
      template: 'Nous recherchons les magasins correspondants...'
    });

    if (timer) {
      $timeout.cancel(timer);
    }

    timer = $timeout(function getProduct() {
      ShopAPI.search({
        lat: ($scope.position ? $scope.position.coords.latitude : 0),
        lon: ($scope.position ? $scope.position.coords.longitude : 0),
        stars: $scope.minimumStar,
        address: $scope.address
      }, function(shops) {
        $scope.shops = shops;
        $ionicLoading.hide();
      }, function(err) {
        console.log(err);
      });
    }, 1300);
  }

  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      $scope.position = position;
      refreshShopList();
    }, function(err) {
      $ionicPopup.alert({
       title: 'Attention !',
       template: 'Nous n\'arrivons pas à vous géolocaliser, merci d\'activer votre GPS.'
      });
      $ionicLoading.hide();
    });

  $scope.setShop = function (shop) {
    CurrentAvailability.setShop(shop, function () {
      $state.go('tabs.scheduledelivery');
    });
  };

  $scope.openMap = function (shop) {
    var address = shop.address;
    var url='';
    if (ionic.Platform.isIOS()) {
    	url = "http://maps.apple.com/maps?q=" + encodeURIComponent(address);
    } else if (ionic.Platform.isAndroid()) {
    	url = "geo:?q=" + encodeURIComponent(address);
    } else {
    	url = "http://maps.google.com?q=" + encodeURIComponent(address);
    }
    window.open(url, "_system", 'location=no');
  };

  $scope.search = function(query) {
    $scope.address = query;
    refreshShopList();
  };

})
