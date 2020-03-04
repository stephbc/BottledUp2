const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define(
  'product',
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isIn: [['bottle', 'lid', 'straw']]
      }
    },
    material: {
      type: Sequelize.STRING,
      allowNull: false
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    color: {
      type: Sequelize.STRING
    },
    imgUrl: {
      type: Sequelize.STRING,
      defaultValue: 'public/favicon.ico'
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false
    }
  },
  {
    hooks: {
      beforeValidate: function(product) {
        if (!product.imgUrl) {
          product.imgUrl = 'public/favicon.ico'
        }
      }
    }
  }
)

module.exports = Product
