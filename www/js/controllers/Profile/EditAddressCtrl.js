angular.module('shopmycourse.controllers')

/**
 * @name ProfileEditAddressCtrl
 * @function Controleur
 * @memberOf shopmycourse.controllers
 * @description Édition de l'adresse dans les paramètres
 */

.controller('ProfileEditAddressCtrl', function($scope, $rootScope, $state, Validation, CardAPI, CurrentAddress, DomRefresher) {

  /**
   * @name $scope.endEdit
   * @description Enregistrement de l'adresse modifiée
   */

  $scope.data = {
    address: '',
    zip: '',
    city: ''
  };
  
  DomRefresher(function(){
    var _data = CurrentAddress.get();
    $scope.data.address = _data.address;
  });

  $scope.endEdit = function($event) {
    $event.preventDefault();
    CurrentAddress.set($scope.currentAddress);
    $state.go('tabs.profile');
  };

})
