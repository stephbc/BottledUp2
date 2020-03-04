const Sequelize = require('sequelize')
const db = require('../db')

const Orders = db.define('orders', {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  totalCost: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  complete: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Orders
