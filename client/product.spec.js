import {expect} from 'chai'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import {getAllProducts, getSingleProduct} from './store/product'
import appReducer from './store/product'
import {createStore} from 'redux'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)
const initialState = {
  products: [],
  product: {}
}

describe('Products', () => {
  let fakeStore
  const products = [
    {name: 'The Sarah', type: 'bottle', imageUrl: '/images/r2d2.png'},
    {name: 'The David', type: 'bottle', imageUrl: '/images/walle.jpeg'}
  ]

  const product = {
    name: 'The Sarah',
    type: 'bottle',
    imageUrl: '/images/r2d2.png'
  }

  beforeEach(() => {
    fakeStore = mockStore(initialState)
  })

  describe('Redux', () => {
    describe('get/fetch all products', () => {
      it('getAllProducts action creator', () => {
        expect(getAllProducts(products)).to.deep.equal({
          type: 'GET_ALL_PRODUCTS',
          products
        })
      })
    })

    describe('get/fetch single product', () => {
      it('getSingleProduct action creator', () => {
        expect(getSingleProduct(product)).to.deep.equal({
          type: 'GET_SINGLE_PRODUCT',
          product
        })
      })
    })
  })

  describe('reducer', () => {
    let testStore
    beforeEach(() => {
      testStore = createStore(appReducer)
    })

    it('reduces on GET_ALL_PRODUCTS action', () => {
      const action = {type: 'GET_ALL_PRODUCTS', products}

      const prevState = testStore.getState()
      testStore.dispatch(action)
      const newState = testStore.getState()

      expect(newState.products).to.be.deep.equal(products)
      expect(newState.products).to.not.be.equal(prevState.products)
    })

    it('reduces on GET_SINGLE_PRODUCT action', () => {
      const action = {type: 'GET_SINGLE_PRODUCT', product}

      const prevState = testStore.getState()
      testStore.dispatch(action)
      const newState = testStore.getState()

      expect(newState.product).to.be.deep.equal(product)
      expect(newState.product).to.not.be.equal(prevState.product)
    })
  })
})
