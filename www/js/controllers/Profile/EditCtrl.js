angular.module('shopmycourse.controllers')

.controller('ProfileEditCtrl', function($scope, $state, $ionicHistory, $ionicViewSwitcher, $ionicPopup, Validation, CurrentUser, UserAPI) {

  $scope.validation = Validation;

  $scope.user = {};
  CurrentUser.get(function (user) {
      $scope.user = user;
  })

  $scope.avatar = null;
  CurrentUser.getAvatar(function (avatar) {
    $scope.avatar = avatar;
  });

  $scope.togglePhone = function () {
    CurrentUser.get(function (user) {
      user.share_phone = $scope.user.share_phone;
      if (!user.share_phone) {
        var confirmPopup = $ionicPopup.confirm({
          title: 'Afficher son numéro de téléphone',
          template: 'Êtes-vous sûr de vouloir afficher votre numéro de téléphone?'
        });

        confirmPopup.then(function (res) {
          user.share_phone = !res;
          UserAPI.update(user, function (user) {
            CurrentUser.set(user, function() {});
            $scope.user.share_phone = user.share_phone;
          });
        });
      } else {
        UserAPI.update(user, function (user) {
          CurrentUser.set(user, function() {});
          $scope.user.share_phone = user.share_phone;
        });
      }
    });
  };

  $scope.endEdit = function () {
    UserAPI.update($scope.user, function (correct, errorCode) {
      if (correct) {
        CurrentUser.set($scope.user, function () {
          $ionicHistory.nextViewOptions({
            disableAnimate: false,
            disableBack: true
          });
          $state.go('tabs.profile');
        });
      } else {
        console.log(errorCode);
      }
    });
  };
})
