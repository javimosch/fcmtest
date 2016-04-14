angular.module('shopmycourse.controllers')

.controller('OrdersShopCtrl', function($rootScope, $scope, $cordovaGeolocation, toastr, $state, $ionicModal, $ionicLoading, CurrentDelivery, ShopAPI, DeliveryRequestAPI, DeliveryRequestAPI, $timeout) {
  $scope.shops = [];
  $scope.minimumStar = 0;
  $scope.address = "";
  var timer = null;

  var posOptions = {
    timeout: 10000,
    enableHighAccuracy: true
  };


  $ionicLoading.show({
    template: 'Nous recherchons les magasins correspondants...'
  });

  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function(position) {
      $scope.position = position;
      refreshShopList();
    }, function(err) {
      toastr.warning('Nous n\'arrivons pas à vous géolocaliser', 'Attention');
      $ionicLoading.hide();
    });

  function refreshShopList() {
    $ionicLoading.show({
      template: 'Nous recherchons les magasins correspondants...'
    });

    if (timer) {
      $timeout.cancel(timer);
    }

    timer = $timeout(function getProduct() {
      ShopAPI.search({
        lat: $scope.position.coords.latitude,
        lon: $scope.position.coords.longitude,
        stars: $scope.minimumStar,
        schedule: $rootScope.currentDelivery.schedule,
        address: $scope.address
      }, function(shops) {
        $scope.shops = shops;
        $ionicLoading.hide();
      }, function(err) {
        console.log(err);
      });
    }, 1300);
  }

  $ionicModal.fromTemplateUrl('templates/Orders/Modals/Address.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.addressModal = modal
  });

  $scope.setShop = function(shop) {
    CurrentDelivery.setShop(shop, function(currentDelivery) {
      $scope.addressModal.show();
    });
  };

  $scope.sendDeliveryRequest = function(address) {
    var currentDelivery = $rootScope.currentDelivery;
    currentDelivery.buyer_id = $rootScope.currentUser.id;
    currentDelivery.address_attributes = address;

    $ionicLoading.show({
      template: 'Nous créons votre demande...'
    });
    DeliveryRequestAPI.create(currentDelivery, function(data) {
      console.log(data);
      $scope.addressModal.hide();
      $ionicLoading.hide();
      $state.go('tabs.confirmdelivery');
    }, function(err) {
      $ionicLoading.hide();
      console.error(err);
    })
  };

  $scope.setMinimumStar = function(newValue) {
    $scope.minimumStar = newValue;
    refreshShopList();
  };

  $scope.openMap = function(shop) {
    var address = shop.address;
    var url = '';
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
