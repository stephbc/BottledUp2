const Sequelize = require('sequelize')
const db = require('../db')

const Orders = db.define('orders', {
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

Orders.prototype.completion = function() {
  this.complete = true
}

module.exports = Orders
