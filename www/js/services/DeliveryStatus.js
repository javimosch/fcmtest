angular.module('shopmycourse.services')

.factory('DeliveryStatus', function () {
  return {
    pending: {
      color: "#ffc900", //energized
      icon: "ion-person"
    },
    accepted: {
      color: "#ffc900", //energized
      icon: "icon-smc-cart"
    },
    completed: {
      color: "#ffc900", //energized
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
