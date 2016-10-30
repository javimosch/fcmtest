angular.module('shopmycourse.services')

/**
 * @name CurrentAddress
 * @function Service
 * @memberOf shopmycourse.services
 * @description Stockage des disponibilités actuelles
 */

.service('CurrentAvailability', function($rootScope, AvailabilityAPI, DataStorage, Configuration, Promise) {

  var currentAvailability = {
    schedules: [],
    shop_id: null,
    deliveryman_id: $rootScope.currentUser.id
  };


  function awake(next) {
    Configuration.ready().then(function() {
      AvailabilityAPI.get({}, function(currentAvailabilityFromServer) {
        currentAvailability = currentAvailabilityFromServer || {};
        $rootScope.currentAvailability = currentAvailability;
        DataStorage.set('current_availability', currentAvailabilityFromServer);
        next && next(currentAvailability);
        Promise('availability_awake').resolve(currentAvailability);
      });
    });
  }
  
  awake();


  var self = {
    awake: Promise('availability_awake'),
    /**
     * @name load
     * @description Récupération des disponibilités présentes sur le serveur
     */
    load: function(){},
    /**
     * @name get
     * @description Récupération des disponibilités présentes dans la mémoire du téléphone
     */
    get: function(next) {
      return next(currentAvailability);
    },
    /**
     * @name setSchedules
     * @description Ajout des créneaux aux disponibilités
     */
    setSchedules: function(schedules, next) {
      if (currentAvailability.constructor === Array) {
        currentAvailability = {
          schedules: [],
          shop_id: null,
          deliveryman_id: $rootScope.currentUser.id
        };
      }
      currentAvailability.schedules = schedules;
      return DataStorage.set('current_availability', currentAvailability).then(function() {
        $rootScope.currentAvailability = currentAvailability;
        return next(currentAvailability);
      });
    },
    /**
     * @name setShop
     * @description Ajout du magasin aux disponibilités
     */
    setShop: function(shop, next) {
      if (currentAvailability.constructor === Array) {
        currentAvailability = {
          schedules: [],
          shop_id: null,
          deliveryman_id: $rootScope.currentUser.id
        };
      }
      currentAvailability.shop_id = shop.id;
      return DataStorage.set('current_availability', currentAvailability).then(function() {
        $rootScope.currentAvailability = currentAvailability;
        console.log($rootScope.currentAvailability)
        return next(currentAvailability);
      });
    },
    /**
     * @name clear
     * @description Suppression des disponibilités de la mémoire du téléphone
     */
    clear: function(next) {
      currentAvailability = {
        schedules: [],
        shop_id: null,
        deliveryman_id: $rootScope.currentUser.id
      };
      $rootScope.currentAvailability = currentAvailability;
      DataStorage.remove('current_availability').then(next);
    },
    /**
     * @name cancel
     * @description Annulation des disponibilités
     */
    cancel: function(next) {
      async.each(currentAvailability, function(availability, next) {
        AvailabilityAPI.cancel({
          idAvailability: availability.id
        }, function(a, b) {
          return next();
        }, function(err) {
          return next(err);
        })
      }, next)
    }
  };
  window.CurrentAvailability = self;
  return self;

});
