angular.module('shopmycourse.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('tabs', {
    url: '/tabs',
    templateUrl: 'templates/TabBar.html',
    abstract: true
  })

  .state('tabs.home', {
    url: '/home',
    views: {
      'home-tab': {
        templateUrl: 'templates/Home.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('tabs.deliveries', {
    url: '/deliveries',
    views: {
      'deliveries-tab': {
        templateUrl: 'templates/Deliveries.html',
        controller: 'DeliveriesCtrl'
      }
    }
  })

  .state('tabs.newdeliveries', {
    url: '/newdeliveries',
    views: {
      'home-tab': {
        templateUrl: 'templates/NewDeliveries.html',
        controller: 'NewDeliveriesCtrl'
      }
    }
  })

  .state('tabs.deliveriestimetable', {
    url: '/deliveriestimetable',
    views: {
      'home-tab': {
        templateUrl: 'templates/DeliveriesTimetable.html',
        controller: 'DeliveriesTimetableCtrl'
      }
    }
  })

  .state('tabs.deliveriesend', {
    url: '/deliveriesend',
    views: {
      'home-tab': {
        templateUrl: 'templates/DeliveriesEnd.html',
        controller: 'DeliveriesEndCtrl'
      }
    }
  })

  .state('tabs.orders', {
    url: '/orders',
    views: {
      'orders-tab': {
        templateUrl: 'templates/Orders.html',
        controller: 'OrdersCtrl'
      }
    }
  })

  .state('tabs.profile', {
    url: '/profile',
    views: {
      'profile-tab': {
        templateUrl: 'templates/Profile.html',
        controller: 'ProfileCtrl'
      }
    }
  })

  .state('tabs.editprofile', {
    url: '/editprofile',
    views: {
      'profile-tab': {
        templateUrl: 'templates/EditProfile.html',
        controller: 'EditProfileCtrl'
      }
    }
  })

  .state('start', {
    url: '/start',
    templateUrl: 'templates/Start.html',
    controller: 'StartCtrl'
  })

  .state('signin', {
    url: '/signin',
    templateUrl: 'templates/SignIn.html',
    controller: 'SignInCtrl'
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/SignUp.html',
    controller: 'SignUpCtrl'
  })

$urlRouterProvider.otherwise('/start')



});
