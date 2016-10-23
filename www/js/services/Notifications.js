angular.module('shopmycourse.services')

/**
 * @name Notifications
 * @function Service
 * @memberOf shopmycourse.services
 * @description Notification's actions.
 */

.factory('Notifications', function($rootScope, $ionicModal, NotificationAPI, lodash, $log, $q, CurrentDelivery,Promise) {
    var self = {
        _notifications:[]
    };
    
    //$log.debug('DEBUG: notifications awake defined');
    self.awake = Promise('notifications_awake');
    //$log.debug('DEBUG: notifications awake defined ok');
    
    var modal = null;

    $ionicModal.fromTemplateUrl('templates/NotificationsModal.html', {
        scope: $rootScope,
        animation: 'slide-in-up'
    }).then(function(_modal) {
        modal = _modal;
        $rootScope.closeNotificationsModal = function() {
            self.hide();
        };
        //$log.debug('DEBUG: notifications awake resolve');
        Promise('notifications_awake').resolve(self);
        //$log.debug('DEBUG: notifications awake resolve ok');
    });
    
    self.onFetch = function(handler){
      $rootScope.$on('notifications_on_fetch',handler);
    };
    
    self.getAll = function(){
        return self._notifications;  
    };

    self.show = function() {
        self.awake.then(function() {
            modal.show();
        });
    };
    self.hide = function() {
        self.awake.then(function() {
            modal.hide();
        });
    };
    self.fetch = function() {
        var deferred = $q.defer()
        NotificationAPI.awake.then(function(api) {
            api.get({}, function(notifications) {
                self._notifications = lodash.map(notifications, function(n) {
                    n.meta = JSON.parse(n.meta);

                    $log.debug('DEBUG: Notifications get', n);

                    if (!n.meta.buyer) {
                        console.warn('WARN: Notifications buyer null', n);
                        return n;
                    }

                    switch (n.mode) {
                        case 'delivery_request':
                            n.meta.buyer.rating_average = n.meta.buyer.rating_average || 0;
                            break;
                        case 'accepted_delivery':
                            CurrentDelivery.clear();
                            n.meta.deliveryman.rating_average = n.meta.deliveryman.rating_average || 0;
                            break;
                        case 'order_reminder':
                            n.meta.deliveryman.rating_average = n.meta.deliveryman.rating_average || 0;
                            break;
                        case 'cart_filled':
                            n.meta.buyer.rating_average = n.meta.buyer.rating_average || 0;
                            break;
                    }
                    return n;
                });
                $rootScope.$emit('notifications_on_fetch',self.getAll());
                deferred.resolve(notifications);

            }, function(err) {
                console.error('Notifications error : ', err);
            });
        });
        return deferred.promise;
    };
    self.showIfAny = function() {
        //$log.debug('DEBUG: notifications showIfAny');
        self.awake.then(function() {
            //$log.debug('DEBUG: notifications showIfAny fetch');
            self.fetch().then(function(notifications) {
                //$log.debug('DEBUG: notifications showIfAny resolve');
                if (notifications.length > 0) {
                    self.show();
                }
            });
        });
    };
    window.Notifications = self;
    return self;
});
