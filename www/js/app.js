// Ionic Shop My Course App

angular.module('shopmycourse', [
  'ionic',
  'jrCrop',
  'toastr',
  'ngLodash',
  'ngCordova',
  'ngCordovaOauth',
  'angularMoment',
  'LocalForageModule',
  'shopmycourse.filters',
  'shopmycourse.controllers',
  'shopmycourse.routes',
  'shopmycourse.services',
  'shopmycourse.directives'
])

.run(function($ionicPlatform, $rootScope, $ionicModal, NotificationAPI, CurrentDelivery, CurrentUser) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    document.addEventListener('resume', function() {
      $ionicModal.fromTemplateUrl('templates/NotificationsModal.html', {
        scope: $rootScope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $rootScope.notificationsModal = modal
      });
      $rootScope.openNotificationsModal = function() {
        $rootScope.notificationsModal.show();
      };
      $rootScope.closeNotificationsModal = function() {
        $rootScope.notificationsModal.hide();
      };

      if (CurrentUser.isLogged()) {
        $rootScope.notifications = [];
        NotificationAPI.get({}, function(notifications) {
          $rootScope.notifications = window._.map(notifications, function(n) {
            n.meta = JSON.parse(n.meta);
            switch (n.mode) {
              case 'delivery_request':
                n.meta.buyer.rating_average = n.meta.buyer.rating_average || 0;
                break;
              case 'accepted_delivery':
                CurrentDelivery.clear();
                n.meta.deliveryman.rating_average = n.meta.deliveryman.rating_average || 0;
                break;
              case 'order_reminder':
                n.meta.deliveryman.rating_average = n.meta.deliveryman.rating_average || 0;
                break;
              case 'cart_filled':
                n.meta.buyer.rating_average = n.meta.buyer.rating_average || 0;
                break;
            }
            return n;
          });
          if (notifications.length > 0) {
            $rootScope.openNotificationsModal();
          }
        }, function(err) {
          console.error('Notifications error : ', err);
        });
      }
    }, false);
  });
})



.run(function(ConfigAPI, Configuration) {
  ConfigAPI.fetch({}, function(config) {
    Configuration.init(config);
  });
})


.config(function($httpProvider) {
  $httpProvider.interceptors.push('HTTPInterceptor');
})

.config(function($ionicConfigProvider) {
  $ionicConfigProvider.backButton.previousTitleText(false).text(' ').icon('icon-smc-back');
  $ionicConfigProvider.tabs.position('bottom');
  $ionicConfigProvider.views.swipeBackEnabled(false);
})

.config(function(toastrConfig) {
  angular.extend(toastrConfig, {
    maxOpened: 1
  });
})



.run(function(DeliveryRequestAPI, Browser, $localForage) {
  window.DeliveryRequestAPI = DeliveryRequestAPI;
  window.Browser = Browser
  window.$localForage = $localForage
})


.config(['$localForageProvider', function($localForageProvider) {
  $localForageProvider.config({
    driver: 'localStorageWrapper',
    name: 'ShopMyCourse',
    version: 1.0,
    storeName: 'main',
    description: 'Main local database for ShopMyCourse mobile app'
  });
}])

.filter('replaceHttp', function() {
  return function(url) {
    if (url) {
      return url.replace(/http:/g, 'https:');
    }
  };
});
