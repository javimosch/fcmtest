angular.module('shopmycourse.controllers')

.controller('ProfileShowCtrl', function($scope, $ionicLoading, $state, $ionicPopup, Authentication, CurrentUser, UserAPI) {

  $scope.user = {};
  $ionicLoading.show({
    template: 'Nous récupérons votre profil...'
  });
  CurrentUser.get(function (user) {
      $scope.user = user;
      $ionicLoading.hide();
  })

  $scope.avatar = null;
  CurrentUser.getAvatar(function (avatar) {
    $scope.avatar = avatar;
  });

  $scope.togglePhone = function () {
    if ($scope.user.share_phone) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Afficher son numéro de téléphone',
        template: 'Êtes-vous sûr de vouloir afficher votre numéro de téléphone?'
      });

      confirmPopup.then(function (res) {
        $scope.user.share_phone = res;
        $ionicLoading.show({
          template: 'Nous sauvegardons vos préférences...'
        });
        UserAPI.update($scope.user, function (user) {
          $ionicLoading.hide();
          CurrentUser.set(user, function() {});
          $scope.user = user;
        });
      });
    } else {
      $ionicLoading.show({
        template: 'Nous sauvegardons vos préférences...'
      });
      UserAPI.update($scope.user, function (user) {
        $ionicLoading.hide();
        CurrentUser.set(user, function() {});
        $scope.user = user;
      });
    }

  };


  $scope.logout = function () {
    Authentication.logout(function() {
      $state.go('start');
    });
  }
})
