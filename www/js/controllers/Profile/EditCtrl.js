angular.module('shopmycourse.controllers')

.controller('ProfileEditCtrl', function($scope, $ionicLoading, $state, $ionicHistory, $ionicViewSwitcher, $ionicPopup, Validation, CurrentUser, UserAPI, Camera, $ionicActionSheet) {

  $scope.validation = Validation;

  $ionicLoading.show({
    template: 'Nous récupérons votre profil...'
  });
  $scope.user = {};
  CurrentUser.get(function (user) {
      $scope.user = user;
      $ionicLoading.hide();
  })

  $scope.avatarBackground = "http://pickaface.net/includes/themes/clean/img/slide2.png";

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

    getPictureFromCamera = function(type) {
      Camera.getPicture(type, function(imageData) {
          // Pass the base64 string to avatar.url for displaying in the app
          $rootScope.avatarBackground = "data:image/jpeg;base64," + imageData;
          $scope.$apply();

          // Pass the base64 string to the param for rails saving
          $scope.seller.avatar = "data:image/jpeg;base64," + imageData;
          SellerAPI.update($scope.seller, function() {
              CurrentSeller.reloadSeller();
          }, function() {});
      })
  }

  $scope.changeAvatar = function() {

      var photoSheet = $ionicActionSheet.show({
          buttons: [
              { text: 'Prendre une photo' },
              { text: 'Accéder à la galerie' }
          ],
          titleText: 'Modifier votre avatar',
          cancelText: 'Annuler',
          cancel: function() {
              // add cancel code..
          },
          buttonClicked: function(index) {
              getPictureFromCamera(index);
              return true;
          }
      });
  }


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
