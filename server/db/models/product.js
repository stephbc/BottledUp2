const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
  },
  type: {
    type: Sequelize.STRING,
    validate: {
      inIn: [['bottles', 'lids', 'straws']]
    }
  },
  material: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.DECIMAL,
    validate: {
      min: 0
    }
  },
  inventory: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  color: {
    type: Sequelize.STRING,
  },
  imgUrl: {
    type: Sequelize.STRING,
    defaultValue: 'public/favicon.ico'
  }
})

module.exports = Product
