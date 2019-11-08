'use strict';
module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define('order', {
    is_done: DataTypes.BOOLEAN,
    is_booked: DataTypes.BOOLEAN,
    duration: DataTypes.INTEGER,
    order_end_time: DataTypes.DATE,
    customer_id: DataTypes.INTEGER,
    room_id: DataTypes.INTEGER
  }, {});
  order.associate = function(models) {
    // associations can be defined here
    // order.belongsTo(models.room, {
    //   as: 'rooms',
    //   foreignKey: 'room_id'
    // });

    // order.belongsTo(models.customer, {
    //   as: 'customers',
    //   foreignKey: 'customer_id'
    // })
    // order.belongsTo(models.room, {
    //   foreignKey: 'room_id'
    // })
    order.belongsTo(models.customer, {
      foreignKey: 'customer_id',
      as: 'customers'
    })
  };
  return order;
};