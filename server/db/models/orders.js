const Sequelize = require('sequelize')
const db = require('../db')
const ProductOrders = require('./productOrders')
const Product = require('./product')

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
  },
  address: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: ['5 Hanover Square', 'New York', 'New York', '10016', 'USA']
  },
  billingInfo: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: ['cardnumber', 'expMonth', 'expYear', 'cvc']
  }
})

Orders.prototype.completion = async function() {
  this.complete = true
  await this.save()
}
Orders.prototype.allItems = async function() {
  let cart = await ProductOrders.findAll({
    where: {
      orderId: this.id
    }
  })
  let quant = 0
  cart.map(el => {
    quant += el.quantity || 1
  })
  this.quantity = quant
  await this.save()
}
Orders.prototype.totalPrice = async function() {
  let cart = await ProductOrders.findAll({
    where: {
      orderId: this.id
    }
  })

  let sum = 0
  await Promise.all(
    cart.map(async el => {
      let price
      const product = await Product.findOne({
        where: {
          id: el.productId
        }
      })
      price = el.quantity * product.price
      sum += price
    })
  )
  this.totalCost = sum
  await this.save()
}

module.exports = Orders
