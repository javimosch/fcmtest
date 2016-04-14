angular.module('shopmycourse.services')

.factory('DeliveryStatus', function () {
  return {
    accepted: {
      color: "yellow",
      icon: "icon-smc-cart"
    },
    completed: {
      color: "yellow",
      icon: "icon-smc-cart-down"
    },
    done: {
      color: "green",
      icon: "icon-smc-check"
    },
    canceled: {
      color: "red",
      icon: "icon-smc-cart-cancel"
    }
  };
});
