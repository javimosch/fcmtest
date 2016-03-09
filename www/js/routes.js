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

  .state('tabs.timetabledeliveries', {
    url: '/timetabledeliveries',
    views: {
      'home-tab': {
        templateUrl: 'templates/DeliveriesTimetable.html',
        controller: 'DeliveriesTimetableCtrl'
      }
    }
  })

  .state('tabs.enddeliveries', {
    url: '/enddeliveries',
    views: {
      'home-tab': {
        templateUrl: 'templates/DeliveriesEnd.html',
        controller: 'DeliveriesEndCtrl'
      }
    }
  })

  .state('tabs.delivery', {
    url: '/delivery',
    views: {
      'deliveries-tab': {
        templateUrl: 'templates/Delivery.html',
        controller: 'DeliveryCtrl'
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

  .state('tabs.order', {
    url: '/order',
    views: {
      'orders-tab': {
        templateUrl: 'templates/Order.html',
        controller: 'OrderCtrl'
      }
    }
  })

  .state('tabs.ordercontent', {
    url: '/ordercontent',
    views: {
      'orders-tab': {
        templateUrl: 'templates/OrderContent.html',
        controller: 'OrderContentCtrl'
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

  .state('tabs.editcreditcard', {
    url: '/editcreditcard',
    views: {
      'profile-tab': {
        templateUrl: 'templates/EditCreditCard.html',
        controller: 'EditCreditCardCtrl'
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

  .state('tabs.neworder', {
    url: '/neworder',
    views: {
      'home-tab': {
        templateUrl: 'templates/NewOrder.html',
        controller: 'NewOrderCtrl'
      }
    }
  })

  .state('tabs.shoporder', {
    url: '/shoporder',
    views: {
      'home-tab': {
        templateUrl: 'templates/ShopOrder.html',
        controller: 'ShopOrderCtrl'
      }
    }
  })

  .state('tabs.endorder', {
    url: '/endorder',
    views: {
      'home-tab': {
        templateUrl: 'templates/EndOrder.html',
        controller: 'EndOrderCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/start')

});
