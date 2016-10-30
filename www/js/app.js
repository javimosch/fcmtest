/*global $*/
/*global cordova*/
/*global StatusBar*/
/*global angular*/
/*global navigator*/
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

.run(function($ionicPlatform, $rootScope, $ionicModal, NotificationAPI, CurrentDelivery, CurrentUser, $log, Notifications) {
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

    window.r = $rootScope;

    CurrentUser.awake.then(function() {
      if (CurrentUser.isLogged()) {
        $log.debug('DEBUG: app logged');
        $.browser_isDevice = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
        if (!$.browser_isDevice) {
          $log.debug('DEBUG: app is a browser');
          Notifications.showIfAny();
        }
        else {
          $log.debug('DEBUG: app is a device');
          document.addEventListener('resume', function() {
            Notifications.showIfAny();
          }, false);
        }
      }
      else {
        $log.debug('DEBUG: app not logged');
      }
    });

  });
})



.run(function(ConfigAPI, Configuration) {
  ConfigAPI.fetch({}, function(config) {
    config = JSON.parse(angular.toJson(config));
    Configuration.init(config);
  }, function(err) {
    console.log(err)
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
