import axios from 'axios'
import history from '../history'

//anonymous cart
const initialState = {}

const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'

export const getCart = cart => {
  return {
    type: GET_CART,
    cart
  }
}

export const addToCart = productId => {
  return {
    type: ADD_TO_CART,
    productId
  }
}

export const getCartThunk = () => {
  return async dispatch => {
    try {
      const res = await axios.get('/api/order')
    } catch (error) {
      console.error(error)
    }
  }
}

export const addToCartThunk = () => {
  return async dispatch => {
    try {
      const res = await axios.put('/api/order')
    } catch (error) {
      console.error(error)
    }
  }
}

export default (cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case ADD_TO_CART:
      return {...state, items: [...state.items, action.productId]}
    default:
      return state
  }
})
