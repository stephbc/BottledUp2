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

router.use((req, res, next) => {
  if (!req.session.cart) req.session.cart = []
  // console.log('SESSION: ', req.session)
  next()
})

router.get('/', checkIfAdmin, async (req, res, next) => {
  try {
    const allOrders = await Orders.findAll()
    if (allOrders) res.json(allOrders)
    else res.sendStatus(404)
  } catch (err) {
    next(err)
  }
})

router.get('/cart', (req, res, next) => {
  try {
    // console.log(req.session.cart)
    if (!req.user) res.json(req.session.cart)
  } catch (error) {
    next(error)
  }
})

router.get('/cart/:userId', async (req, res, next) => {
  try {
    const thisUser = await User.findByPk(req.params.userId)
    if (!thisUser) res.sendStatus(401)
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
      const items = await ownCart.getProducts()
      const fullCart = {
        items,
        quantity: ownCart.quantity,
        totalCost: ownCart.totalCost
      }
      res.json(fullCart)
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
      const alreadyInCart = await ProductOrders.findOne({
        where: {
          orderId: cart.id,
          productId: product.id
        }
      })
      if (alreadyInCart) {
        alreadyInCart.quantity++
        alreadyInCart.save()
      } else {
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
        }
        await cart.allItems()
        await cart.totalPrice()
        res.json(product)
      }
    } else {
      const product = await Product.findOne({
        where: {
          id: req.params.productId
        }
      })
      req.session.cart.push(product)
      res.json(product)
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
      const itemsInCart = await cart.getProducts()
      await Promise.all(
        itemsInCart.map(async el => {
          const throughItem = await ProductOrders.findOne({
            where: {
              orderId: cart.id,
              productId: el.id
            }
          })
          throughItem.priceAtPurchase = el.price
          await throughItem.save()
        })
      )
      const address = req.body.address
      const billingInfo = req.body.billingInfo
      cart.address = address
      cart.billingInfo = billingInfo
      await cart.save()
      await cart.completion()
      const user = await User.findOne({
        where: {
          id: req.user.id
        }
      })
      const newCart = await Orders.create()
      await user.addOrder(newCart)
      res.json(newCart)
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
      if (!productInCart) {
        const product = await Product.findOne({
          where: {
            id: req.params.productId
          }
        })
        await cart.addProduct(product)
        productInCart = await ProductOrders.findOne({
          where: {
            orderId: cart.id,
            productId: req.params.productId
          }
        })
      }
      for (let i = 0; i < req.params.qty; i++) {
        productInCart.quantity++
        await productInCart.save()
      }
      // productInCart.quantity = parseInt(productInCart.quantity, 10) + req.params.qty
      // await productInCart.save()
      await cart.totalPrice()
      await cart.allItems()

      if (productInCart.quantity === req.params.qty) {
        res.status(200).json(req.user.id)
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
