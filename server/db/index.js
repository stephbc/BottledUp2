const db = require('./db')

// register models
require('./models')
const Orders = require('./models/orders')
const User = require('./models/user')
const ProductOrders = require('./models/productOrders')
const Product = require('./models/product')

Product.belongsToMany(Orders, {through: ProductOrders})
Orders.belongsToMany(Product, {through: ProductOrders})

User.hasMany(Orders)
Orders.belongsTo(User)

module.exports = db
