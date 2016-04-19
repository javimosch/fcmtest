angular.module('shopmycourse.controllers')

.controller('OrdersShowCtrl', function($scope, $ionicLoading, $rootScope, $stateParams, CurrentCart, $ionicModal, OrderStore, $interval, $cordovaSms, DeliveryAPI, CurrentUser, $state) {

  $scope.order = {};
  $scope.user = {};

  $ionicLoading.show({
    template: 'Nous recherchons votre commande...'
  });

  CurrentUser.get(function(user) {
    $scope.user = user;
  })

  OrderStore.get({id: parseInt($stateParams.idOrder)}, function (err, order) {
    $scope.order = order[0];
    $scope.order.deliveryman.rating_average |= 0;
    $ionicLoading.hide();
  })

  $ionicModal.fromTemplateUrl('templates/Orders/Modals/Finish.html', {
      scope: $scope,
      animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.finishOrderModal = modal
  });

  $scope.openFinishOrderModal = function () {
    $scope.finishOrderModal.show();
  };

  $scope.closeFinishOrderModal = function () {
    $scope.finishOrderModal.hide();
  };

  $scope.sendSMS = function () {
    var number = $scope.order.deliveryman.phone;
    $cordovaSms.send(number, '', {
              android: {
                intent: 'INTENT'// send SMS with the native android SMS messaging
            }
          }).then(function () {
      console.log('Succesfully send SMS');
    }, function (err) {
      console.log(err);
    });
  };

  $scope.deliveryStarted = function(schedule, date) {
    if (!schedule || !date)
      return;

    var hours = schedule.replace('h', '').split('-');
    var from_ = hours[0];
    var now = moment()
    var date = moment(date);

    date.hours(from_);
    return now.unix() > date.unix();
  }

  $scope.confirmDelivery = function() {
    DeliveryAPI.confirm({
      'idDelivery': $scope.order.id
    }, function() {
      OrderStore.pull(function(orders) {
        if ($scope.user.wallet && $scope.user.wallet.lemonway_card_id) {
          $state.go('tabs.sendOrder', {
            idOrder: parseInt($stateParams.idOrder)
          });
        } else {
          $state.go('tabs.orderpayment', {
            idOrder: parseInt($stateParams.idOrder)
          });
        }

      });
    })
  }
})
