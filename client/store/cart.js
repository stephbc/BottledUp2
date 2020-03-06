import axios from 'axios'

//anonymous cart
const initialState = {
  items: []
}

const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
// const UPDATE_CART = 'UPDATE_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'

export const getCart = cart => {
  return {
    type: GET_CART,
    cart
  }
}

export const addToCart = product => {
  return {
    type: ADD_TO_CART,
    product
  }
}

export const removeFromCart = productId => {
  return {
    type: REMOVE_FROM_CART,
    productId
  }
}

// export const updateCart = (productId, productUpdates) => {
//   return {
//     type: UPDATE_CART,
//     productId,
//     productUpdates
//   }
// }

export const updateQuantity = (productId, qty) => {
  return {
    type: UPDATE_QUANTITY,
    productId,
    qty
  }
}

export const getCartThunk = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/orders/cart/${userId}`)
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
      const {data} = await axios.post(`/api/orders/${productId}`)
      dispatch(addToCart(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const removeFromCartThunk = productId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/orders/${productId}`)
      dispatch(removeFromCart(productId))
    } catch (error) {
      console.error(error)
    }
  }
}

// export const updateCartThunk = (productId, productUpdates => {
//   return async dispatch => {
//     try {
//       const updates = await axios.put('')
//     } catch(error) {
//       console.error(error)
//     }
//   }
// })

export const updateQuantityThunk = (productId, qty) => {
  return async dispatch => {
    try {
      await axios.put(`/api/orders/${productId}/${qty}`)
      dispatch(updateQuantity(productId, qty))
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
      return {...state, items: [...state.items, {...action.product, qty: 1}]}
    case UPDATE_QUANTITY:
      return {
        ...state,
        items: state.items.filter(el => {
          if (el.id === action.productId) {
            el.qty = action.qty
            return el
          }
        })
      }
    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter(el => {
          if (!el.id === action.productId) {
            return el
          }
        })
      }

    default:
      return state
  }
}
