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
    city: '',
    additional_address:''
  };
  window.s = $scope;
  
  DomRefresher(function(){
    var _data = CurrentAddress.get();
    $scope.data.address = _data.address;
    $scope.data.additional_address = _data.additional_address;
    $scope.data.zip = _data.zip;
    $scope.data.city = _data.city;
  });

  $scope.endEdit = function($event) {
    $event.preventDefault();
    CurrentAddress.set($scope.data);
    $state.go('tabs.profile');
  };

})
