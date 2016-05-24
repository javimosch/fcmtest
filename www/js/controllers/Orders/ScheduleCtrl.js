angular.module('shopmycourse.controllers')

.controller('OrdersScheduleCtrl', function($scope, $rootScope, $state, CurrentDelivery, $ionicModal, CurrentAddress, moment, lodash) {
  $scope.schedules = [];
  $scope.selected = $rootScope.currentDelivery;
  var times = ['08h - 10h', '10h - 12h', '12h - 14h', '14h - 16h', '16h - 18h', '18h - 20h', '20h - 22h'];
  var now = moment();

  for (var i = 0; i < 7; i++) {
    var date = new Date(new Date().getTime() + i * 24 * 60 * 60 * 1000);
    var day = moment(date).hours(0).minutes(0).seconds(0);
    var scheduleTimes = [];

    lodash.each(times, function(time) {
      var hours = time.replace('h', '').split('-');
      var start = parseInt(hours[0]);

      day.hours(start);
      if (day.unix() >= (now.unix() - (90 * 60))) {
        scheduleTimes.push(time);
      }
    });
    $scope.schedules.push({
      date: date,
      times: scheduleTimes
    });
  }

  CurrentAddress.init()

  $scope.selectTime = function (date, time) {
    // Si la case est déjà selectionnées
    if ($scope.isSelected(date, time)) {
      var index = $scope.selected[date].indexOf(time);
      $scope.selected[date].splice(index, 1);
      return;
    }
    // Si la case n'est pas selectionnées
    else {
      // if (!$scope.selected[date] || $scope.selected[date].length <= 0) {
      //   $scope.selected[date] = []
      // }
      $scope.selected = {};
      $scope.selected[date] = [];
      $scope.selected[date].push(time);
    }
  };

  $scope.isSelected = function (date, time) {
    if (!$scope.selected[date] || $scope.selected[date].length <= 0) {
      return false;
    }
    return ($scope.selected[date].indexOf(time) > -1);
  };

  $scope.validate = function () {
    CurrentDelivery.setSchedule($scope.selected, function () {
      $state.go('tabs.addressorder');
    });
  };
})
