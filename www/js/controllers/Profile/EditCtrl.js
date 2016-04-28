angular.module('shopmycourse.controllers')

.controller('ProfileEditCtrl', function($scope, $ionicLoading, $state, $ionicHistory, $ionicViewSwitcher, $ionicPopup, Validation, CurrentUser, UserAPI) {

  $scope.validation = Validation;

  $ionicLoading.show({
    template: 'Nous récupérons votre profil...'
  });
  $scope.user = {};
  CurrentUser.get(function (user) {
      $scope.user = user;
      $ionicLoading.hide();
  })

  $scope.avatar = null;
  CurrentUser.getAvatar(function (avatar) {
    $scope.avatar = avatar;
  });

  $scope.togglePhone = function () {
    CurrentUser.get(function (user) {
      user.share_phone = $scope.user.share_phone;
      if (user.share_phone) {
        var confirmPopup = $ionicPopup.confirm({
          title: 'Afficher son numéro de téléphone',
          template: 'Êtes-vous sûr de vouloir afficher votre numéro de téléphone?'
        });

        confirmPopup.then(function (res) {
          user.share_phone = res;
          $ionicLoading.show({
            template: 'Nous sauvegardons vos préférences...'
          });
          UserAPI.update(user, function (user) {
            CurrentUser.set(user, function() {});
            $scope.user.share_phone = user.share_phone;
            $ionicLoading.hide();
          });
        });
      } else {
        $ionicLoading.show({
          template: 'Nous sauvegardons vos préférences...'
        });
        UserAPI.update(user, function (user) {
          CurrentUser.set(user, function() {});
          $scope.user.share_phone = user.share_phone;
          $ionicLoading.hide();
        });
      }
    });
  };

  $scope.endEdit = function () {
    $ionicLoading.show({
      template: 'Nous sauvegardons votre profil...'
    });
    UserAPI.update($scope.user, function (correct, errorCode) {
      $ionicLoading.hide();
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
    }, function(err) {
      $ionicLoading.hide();
      console.log(err);
    });
  };
})
