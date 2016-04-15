angular.module('shopmycourse.controllers')

.controller('OrdersShowCtrl', function($scope, $ionicLoading, $rootScope, $stateParams, CurrentCart, $ionicModal, OrderStore, $interval, $cordovaSms) {

  $scope.order = {};

  $ionicLoading.show({
    template: 'Nous recherchons votre commande...'
  });

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
})
