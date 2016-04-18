angular.module('shopmycourse.controllers')

.controller('OrdersScheduleCtrl', function($scope, $rootScope, $state, CurrentDelivery, $ionicModal) {
  $scope.schedules = [];
  $scope.selected = $rootScope.currentDelivery;

  for (var i = 0; i < 7; i++) {
    var date = new Date(new Date().getTime() + i * 24 * 60 * 60 * 1000);
    $scope.schedules.push({
      date: date,
      times: ['08h - 10h', '10h - 12h', '12h - 14h', '14h - 16h', '16h - 18h', '18h - 20h', '20h - 22h']
    })
  }

  $ionicModal.fromTemplateUrl('templates/Orders/Modals/Address.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.addressModal = modal
  });

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
      $scope.addressModal.show();
    });
  };
})
