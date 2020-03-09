const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')
const Orders = db.model('orders')
const productOrders = db.model('productOrders')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('creating a Product', () => {
    describe('correctBottle', () => {
      let fakeBottle

      beforeEach(async () => {
        fakeBottle = await Product.create({
          name: 'The Jane',
          type: 'bottle',
          material: 'pure gold',
          price: 9999,
          color: '24K Magic',
          description: 'only the best'
        })
      })

      it('the right bottle is in our system', () => {
        expect(fakeBottle.name).to.be.equal('The Jane')
      })

      it('the description is available', () => {
        expect(fakeBottle.description).to.deep.equal('only the best')
      })

      it('automatically assigns the default imageUrl', () => {
        expect(fakeBottle.imgUrl).to.be.equal('public/favicon.ico')
      })
    })
  })
}) // end describe('Product model')

describe('Orders model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  describe('orders model', () => {
    let fakeOrder

    beforeEach(async () => {
      fakeOrder = await Orders.create({
        quantity: 1,
        totalCost: 2499,
        complete: false
      })
    })

    it('should be an instance of an order', () => {
      expect(fakeOrder).to.be.instanceOf(Orders)
    })

    it('the quantity is an integer', () => {
      expect(fakeOrder.quantity).to.be.equal(1)
    })

    it('complete property should be a boolean', () => {
      expect(fakeOrder.complete).to.be.equal(false)
    })
  })
})

describe('ProductOrders model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let fakeOrder
      let fakeBottle
      let association

      beforeEach(async () => {
        fakeOrder = await Orders.create({
          quantity: 1,
          totalCost: 2499,
          complete: false
        })
        fakeBottle = await Product.create({
          name: 'The Jane',
          type: 'bottle',
          material: 'pure gold',
          price: 9999,
          color: '24K Magic',
          description: 'only the best'
        })
        association = await fakeOrder.addProduct(fakeBottle)
      })

      it('should be an instance of an order', () => {
        expect(association[0]).to.be.instanceOf(productOrders)
      })

      it('the right order is used', () => {
        expect(association[0].orderId).to.be.equal(fakeOrder.id)
      })

      it('the correct product is added', () => {
        expect(association[0].productId).to.be.equal(fakeBottle.id)
      })
    })
  })
})
