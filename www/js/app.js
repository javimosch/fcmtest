// Ionic Shop My Course App

angular.module('shopmycourse', [
  'ionic',
  'toastr',
  'ngLodash',
  'angularMoment',
  'shopmycourse.controllers',
  'shopmycourse.routes',
  'shopmycourse.services',
  'shopmycourse.directives'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function ($httpProvider) {
  $httpProvider.interceptors.push('HTTPInterceptor');
})

.filter('replaceHttp', function () {
  return function (url) {
    if(url) {
      return url.replace(/http:/g, 'https:');
    }
  };
});
