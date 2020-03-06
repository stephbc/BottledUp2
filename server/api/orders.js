const router = require('express').Router()
const {Product, Orders, User, ProductOrders} = require('../db/models')

const checkIfAdmin = (req, res, next) => {
  if (req.user === undefined || req.user.accountType !== 'Admin') {
    const error = new Error('illegal action')
    error.status = 401
    return next(error)
  }
  next()
}

router.get('/', checkIfAdmin, async (req, res, next) => {
  try {
    const allOrders = await Orders.findAll()
    if (allOrders) res.json(allOrders)
    else res.sendStatus(404)
  } catch (err) {
    next(err)
  }
})

router.get('/cart/:userId', async (req, res, next) => {
  try {
    const thisUser = await User.findByPk(req.params.userId)
    if (!req.user) res.sendStatus(401)
    if (
      (thisUser && req.user.email === thisUser.email) ||
      (req.user && req.user.accountType === 'Admin')
    ) {
      const ownCart = await Orders.findAll({
        where: {
          userId: thisUser.id,
          complete: false
        }
      })
      const cartProducts = await ownCart.getProducts()
      if (!cartProducts.length) res.send('Cart is empty')
      else res.json(cartProducts)
    }
  } catch (err) {
    next(err)
  }
})

router.post('/:productId', async (req, res, next) => {
  try {
    if (req.user) {
      const cart = await Orders.findOne({
        where: {
          complete: false,
          userId: req.user.id
        }
      })
      const product = await Product.findOne({
        where: {
          id: req.params.productId
        }
      })
      const association = await cart.addProduct(product)
      if (association) res.json(product)
    }
  } catch (err) {
    next(err)
  }
})

router.put('/checkout', async (req, res, next) => {
  try {
    if (req.user) {
      const cart = await Orders.findOne({
        where: {
          complete: false,
          userId: req.user.id
        }
      })
      const itemsInCart = cart.getProducts()
      itemsInCart.forEach(async el => {
        const throughItem = await ProductOrders.findOne({
          where: {
            orderId: cart.id,
            productId: el.id
          }
        })
        throughItem.priceAtPurchase(el.price)
      })
      cart.completion()
    }
  } catch (err) {
    next(err)
  }
})

router.put('/:productId/:qty', async (req, res, next) => {
  try {
    if (req.user) {
      const cart = await Orders.findOne({
        where: {
          complete: false,
          userId: req.user.id
        }
      })
      const productInCart = await ProductOrders.findOne({
        where: {
          orderId: cart.id,
          productId: req.params.productId
        }
      })
      productInCart.quantity = req.params.qty
      await ProductOrders.update(
        {
          where: {
            orderId: cart.id,
            productId: req.params.productId
          }
        },
        productInCart
      )

      if (productInCart.quantity === req.params.qty) res.sendStatus(200)
      else res.send('failed to change quantity')
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:productId', async (req, res, next) => {
  try {
    if (req.user) {
      const cart = await Orders.findAll({
        where: {
          complete: false,
          userId: req.user.id
        }
      })
      const product = await Product.findAll({
        where: {
          id: req.params.productId
        }
      })
      const deleted = await cart.removeProduct(product)
      if (deleted) res.status(200).json(deleted)
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
