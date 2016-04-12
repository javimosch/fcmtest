angular.module('shopmycourse.controllers')

.controller('OrdersShopCtrl', function($rootScope, $scope, $cordovaGeolocation, toastr, $state, $ionicModal, CurrentDelivery, ShopAPI, DeliveryRequestAPI, DeliveryRequestAPI) {
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
  $ionicModal.fromTemplateUrl('templates/Orders/Modals/Address.html', {
      scope: $scope,
      animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.addressModal = modal
  });

  $scope.setShop = function (shop) {
    CurrentDelivery.setShop(shop, function (currentDelivery) {
      $scope.addressModal.show();
    });
  };

  $scope.sendDeliveryRequest = function (address) {
    var currentDelivery = $rootScope.currentDelivery;
    currentDelivery.buyer_id = $rootScope.currentUser.id;
    currentDelivery.address_attributes = address;
      DeliveryRequestAPI.create(currentDelivery, function (data) {
        console.log(data);
        $scope.addressModal.hide();
        $state.go('tabs.confirmdelivery');
      }, function (err) {
        console.error(err);
      })
  };

  $scope.setMinimumStar = function (newValue) {
    $scope.minimumStar = newValue;
    refreshShopList();
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

})
