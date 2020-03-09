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
Orders.prototype.allItems = function() {
  let cart = this.getProducts()
  let quant = cart.reduce((sum, el) => {
    sum += el.quantity || 1
    return sum
  }, 0)
  this.quantity = quant
  this.save()
  return this.quantity
}
Orders.prototype.totalPrice = function() {
  let cart = this.getProducts()
  let sum = 0
  cart.map(el => {
    if (el.quantity) {
      sum += el.price * el.quantity
    } else sum += el.price
  })
  this.totalCost = sum
  this.save()
}

module.exports = Orders
