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
        templateUrl: 'templates/Deliveries/List.html',
        controller: 'DeliveriesListCtrl'
      }
    }
  })

  .state('tabs.shopdelivery', {
    url: '/delivery/create/shop',
    views: {
      'home-tab': {
        templateUrl: 'templates/Deliveries/Shop.html',
        controller: 'DeliveriesShopCtrl'
      }
    }
  })

  .state('tabs.scheduledelivery', {
    url: '/delivery/create/schedule',
    views: {
      'home-tab': {
        templateUrl: 'templates/Deliveries/Schedule.html',
        controller: 'DeliveriesScheduleCtrl'
      }
    }
  })

  .state('tabs.confirmdelivery', {
    url: '/delivery/create/confirm',
    views: {
      'home-tab': {
        templateUrl: 'templates/Deliveries/Confirm.html',
        controller: 'DeliveriesConfirmCtrl'
      }
    }
  })

  .state('tabs.delivery', {
    url: '/delivery/:idDelivery',
    views: {
      'deliveries-tab': {
        templateUrl: 'templates/Deliveries/Show.html',
        controller: 'DeliveriesShowCtrl'
      }
    }
  })

  .state('tabs.orders', {
    url: '/orders',
    views: {
      'orders-tab': {
        templateUrl: 'templates/Orders/List.html',
        controller: 'OrdersListCtrl'
      }
    }
  })

  .state('tabs.order', {
    url: '/order/:idOrder',
    views: {
      'orders-tab': {
        templateUrl: 'templates/Orders/Show.html',
        controller: 'OrdersShowCtrl'
      }
    }
  })

  .state('tabs.ordercontent', {
    url: '/order/:idOrder/content',
    views: {
      'orders-tab': {
        templateUrl: 'templates/Orders/Content.html',
        controller: 'OrdersContentCtrl'
      }
    }
  })

  .state('tabs.profile', {
    url: '/profile',
    views: {
      'profile-tab': {
        templateUrl: 'templates/Profile/Show.html',
        controller: 'ProfileShowCtrl'
      }
    }
  })

  .state('tabs.editprofile', {
    url: '/profile/edit',
    views: {
      'profile-tab': {
        templateUrl: 'templates/Profile/Edit.html',
        controller: 'ProfileEditCtrl'
      }
    }
  })

  .state('tabs.editcreditcard', {
    url: '/profile/creditcard/edit',
    views: {
      'profile-tab': {
        templateUrl: 'templates/Profile/EditCreditCard.html',
        controller: 'ProfileEditCreditCardCtrl'
      }
    }
  })

  .state('start', {
    url: '/start',
    templateUrl: 'templates/Start.html',
    controller: 'StartCtrl'
  })

  .state('signin', {
    url: '/profile/signin',
    templateUrl: 'templates/Profile/SignIn.html',
    controller: 'ProfileSignInCtrl'
  })

  .state('signup', {
    url: '/profile/signup',
    templateUrl: 'templates/Profile/SignUp.html',
    controller: 'ProfileSignUpCtrl'
  })

  .state('tabs.scheduleorder', {
    url: '/order/create/schedule',
    views: {
      'home-tab': {
        templateUrl: 'templates/Orders/Schedule.html',
        controller: 'OrdersScheduleCtrl'
      }
    }
  })

  .state('tabs.shoporder', {
    url: '/order/create/shop',
    views: {
      'home-tab': {
        templateUrl: 'templates/Orders/Shop.html',
        controller: 'OrdersShopCtrl'
      }
    }
  })

  .state('tabs.confirmorder', {
    url: '/order/create/confirm',
    views: {
      'home-tab': {
        templateUrl: 'templates/Orders/Confirm.html',
        controller: 'OrdersConfirmCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/start')

});
