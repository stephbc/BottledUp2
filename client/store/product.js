import Axios from 'axios'

const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
const CLEAR_SINGLE_PRODUCT = 'CLEAR_SINGLE_PRODUCT'
const ADD_PRODUCT = 'ADD_PRODUCT'

export const getAllProducts = products => {
  return {
    type: GET_ALL_PRODUCTS,
    products
  }
}
export const getSingleProduct = product => {
  return {
    type: GET_SINGLE_PRODUCT,
    product
  }
}
export const clearProduct = () => {
  return {
    type: CLEAR_SINGLE_PRODUCT
  }
}
export const deleteProduct = id => {
  return {
    type: DELETE_PRODUCT,
    id
  }
}
export const updateProduct = product => {
  return {
    type: UPDATE_PRODUCT,
    product
  }
}
export const addProduct = product => {
  return {
    type: ADD_PRODUCT,
    product
  }
}

export const fetchAllProducts = () => {
  return async dispatch => {
    try {
      const {data} = await Axios.get('/api/products')
      dispatch(getAllProducts(data))
    } catch (error) {
      console.error(error)
    }
  }
}
export const fetchSingleProduct = id => {
  return async dispatch => {
    try {
      const {data} = await Axios.get(`/api/products/${id}`)
      dispatch(getSingleProduct(data))
    } catch (error) {
      console.error(error)
    }
  }
}
export const clearSingleProduct = () => {
  return dispatch => {
    dispatch(clearProduct())
  }
}
export const deleteProductThunk = id => {
  return async dispatch => {
    try {
      dispatch(deleteProduct(id))
      await Axios.delete(`/api/products/${id}`)
    } catch (error) {
      console.error(error)
    }
  }
}
export const updateProductThunk = product => {
  return async dispatch => {
    try {
      const {data} = await Axios.put(`/api/products/${product.id}`, product)
      dispatch(updateProduct(data))
    } catch (error) {
      console.error(error)
    }
  }
}
export const addProductThunk = product => {
  return async dispatch => {
    try {
      const formatted = {
        ...product,
        price: Number(product.price)
      }
      const {data} = await Axios.post(`/api/products/`, formatted)
      dispatch(addProduct(data))
    } catch (error) {
      console.error(error)
    }
  }
}

const initialState = {
  products: [],
  product: {}
}

function productsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {...state, products: action.products}
    case GET_SINGLE_PRODUCT:
      return {...state, product: action.product}
    case CLEAR_SINGLE_PRODUCT:
      return {...state, product: {}}
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(prod => prod.id !== action.id)
      }
    case UPDATE_PRODUCT:
      return {...state, product: action.product}
    case ADD_PRODUCT:
      return {...state, products: [...state.products, action.product]}
    default:
      return state
  }
}

export default productsReducer
