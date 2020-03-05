import axios from 'axios'

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

export const getCartThunk = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/order/cart/${userId}`)
      console.log('data', data)
      dispatch(getCart(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const addToCartThunk = productId => {
  return async dispatch => {
    try {
      const res = await axios.post(`/api/order/${productId}`)
      dispatch(addToCart(res.data))
    } catch (error) {
      console.error(error)
    }
  }
}

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      console.log('action', action.cart)
      return action.cart
    case ADD_TO_CART:
      return {...state, items: [...state.items, action.productId]}
    default:
      return state
  }
}
