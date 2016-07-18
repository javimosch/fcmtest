angular.module('shopmycourse.controllers')

.controller('ProfileEditCtrl', function($scope, $ionicLoading, $state, $ionicHistory, $ionicViewSwitcher, $ionicPopup, $jrCrop, Validation, CurrentUser, UserAPI, Camera, $ionicActionSheet) {

  $scope.validation = Validation;

  $ionicLoading.show({
    template: 'Nous récupérons votre profil...'
  });
  $scope.user = {};
  CurrentUser.get(function (user) {
      $scope.user = user;
      $scope.avatarBackground = CurrentUser.getAvatar();
      $ionicLoading.hide();
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
      $jrCrop.crop({
          url: 'data:image/jpeg;base64,' + imageData,
          width: 200,
          height: 200,
          cancelText: 'Annuler',
          chooseText: 'OK'
      }).then(function(image) {
        // Pass the base64 string to avatar.url for displaying in the app
        $scope.avatarBackground = image.toDataURL();
        // Pass the base64 string to the param for rails saving
        $scope.user.avatar = image.toDataURL();
        $scope.$apply();
      }, function() {
        console.log('jrCrop: User canceled or couldn\'t load image.');
      });
    }, function (error) {
      console.log('Camera: ' + error);
    }, {
      correctOrientation: true,
      targetWidth: 200,
      targetHeight: 200
    });
  };

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
    UserAPI.update($scope.user, function (user) {
      $ionicLoading.hide();
      if (user) {
        $scope.user = user;

        CurrentUser.set(user, function () {
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
