const router = require('express').Router()
// const {} = require('../db/models')
//no idea why, but destructuring the orders model isn't working, importing it seperately fixes the error
const Orders = require('../db/models/orders')
const Product = require('../db/models/product')
const User = require('../db/models/user')
const ProductOrders = require('../db/models/productOrders')

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
      const ownCart = await Orders.findOne({
        where: {
          userId: req.params.userId,
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
      await cart.addProduct(product)
      const association = await ProductOrders.findOne({
        where: {
          orderId: cart.id,
          productId: product.id
        }
      })
      if (association) {
        association.quantity = 1
        await association.save()
        await cart.allItems()
        await cart.totalPrice()
        res.json(product)
      }
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
        throughItem.priceAtPurchase = el.price
        await throughItem.save()
      })
      await cart.completion()
      const user = await User.findOne({
        where: {
          id: req.user.id
        }
      })
      const newCart = await Orders.create()
      await user.addOrder(newCart)
    }
  } catch (err) {
    next(err)
  }
})

router.put('/:productId/count/:qty', async (req, res, next) => {
  try {
    if (req.user) {
      const cart = await Orders.findOne({
        where: {
          complete: false,
          userId: req.user.id
        }
      })
      let productInCart
      productInCart = await ProductOrders.findOne({
        where: {
          orderId: cart.id,
          productId: req.params.productId
        }
      })
      // if (!productInCart) {
      //   const product = await Product.findOne({
      //     where: {
      //       id: req.params.productId
      //     }
      //   })
      //   productInCart = await cart.addProduct(product)
      // }
      productInCart.quantity = req.params.qty
      await productInCart.save()
      // await productInCart.setQuantity(req.params.qty)
      await cart.totalPrice()
      await cart.allItems()

      if (productInCart.quantity === req.params.qty) {
        res.sendStatus(200)
      } else res.send('failed to change quantity')
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:productId', async (req, res, next) => {
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
      const deleted = await cart.removeProduct(product)
      const restOfCart = await cart.getProducts()
      if (deleted) {
        cart.allItems()
        cart.totalPrice()
        res.status(200).json(restOfCart)
      }
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
