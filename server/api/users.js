const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

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
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const thisUser = await User.findByPk(req.params.id)
    if (!req.user) res.sendStatus(401)
    if (
      (thisUser && req.user.email === thisUser.email) ||
      (req.user && req.user.accountType === 'Admin')
    )
      res.json(thisUser)
    else res.sendStatus(401)
  } catch (err) {
    next(err)
  }
})

router.post('/', checkIfAdmin, async (req, res, next) => {
  try {
    const newUser = await User.create(req.body)
    if (newUser) res.json(User.findAll())
    else res.sendStatus(500)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', checkIfAdmin, async (req, res, next) => {
  try {
    const thisUser = await User.findByPk(req.params.id)
    if (!req.user) res.sendStatus(401)
    if (
      (thisUser && req.user.email === thisUser.email) ||
      (req.user && req.user.accountType === 'Admin')
    ) {
      await User.destroy({
        where: {
          id: req.params.id
        }
      })
    }
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const thisUser = await User.findByPk(req.params.id)
    if (!req.user) res.sendStatus(401)
    if (
      (thisUser && req.user.email === thisUser.email) ||
      (req.user && req.user.accountType === 'Admin')
    ) {
      await thisUser.update(req.body)
      res.json(thisUser)
    } else res.sendStatus(401)
  } catch (err) {
    next(err)
  }
})
