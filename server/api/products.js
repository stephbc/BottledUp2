const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

const checkIfAdmin = (req, res, next) => {
  // console.log(req.user)
  if (req.user.accountType !== 'Admin') {
    const error = new Error('illegal action')
    error.status = 401
    return next(error)
  }
  next()
}

router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Product.findAll()
    if (allProducts) res.json(allProducts)
    else res.sendStatus(404)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const aProduct = await Product.findByPk(req.params.id)
    if (aProduct) res.json(aProduct)
    else res.sendStatus(404)
  } catch (err) {
    next(err)
  }
})

router.post('/', checkIfAdmin, async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body)
    if (newProduct) res.json(Product.findAll())
    else res.sendStatus(500)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', checkIfAdmin, async (req, res, next) => {
  try {
    await Product.destroy({
      where: {
        id: req.params.id
      }
    })
  } catch (err) {
    next(err)
  }
})

router.put('/:id', checkIfAdmin, async (req, res, next) => {
  try {
    const aProduct = await Product.findByPk(req.params.id)
    if (aProduct) {
      await aProduct.update(req.body)
      res.json(aProduct)
    } else res.sendStatus(404)
  } catch (err) {
    next(err)
  }
})
