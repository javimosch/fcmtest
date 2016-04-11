angular.module('shopmycourse.controllers')

.controller('ProfileEditCreditCardCtrl', function($scope, $state, $ionicHistory, $ionicViewSwitcher, Validation, CardAPI, CurrentUser) {
    $scope.validation = Validation;
    $scope.card = {};
    $scope.expirations = []
    $scope.user = {};

    CurrentUser.get(function (user) {
        $scope.user = user;
    })

    var today = moment();

    //iterate for i years of expiration
    for (i = 0; i < 10; i++) {
        var date = {
            'year': today.year(),
            'months': []
        }


        for (j = today.month(); j <= 12; j++) {
            date.months.push(j < 10 ? "0" + j : j);
        }

        $scope.expirations.push(date);

        today.month(1);
        today.add(1, 'years');
    }

  $scope.endEdit = function ($event) {
    $event.preventDefault();
    var card = {
        number: $scope.card.number,
        type: 0,
        date: $scope.card.month + '/' + $scope.card.year.year,
        cvv: $scope.card.cvv
    }

    CardAPI.update({idUser: $scope.user.id, card: card}, function() {
        $state.go('tabs.home');
    });
  }
})
