'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('orders', [
      {
        is_done: true,
        is_booked: false,
        duration: 10,
        order_end_time: new Date(),
        customer_id:2,
        room_id:2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ],{});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("orders", null, {});
  }
};
