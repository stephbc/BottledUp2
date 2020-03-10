import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {getCartThunk, removeFromCartThunk, checkoutThunk} from '../store/cart'
import SingleProduct from './SingleProduct'
import {me} from '../store'
import axios from 'axios'
import {Link} from 'react-router-dom'

class Viewcart extends React.Component {
  constructor() {
    super()
    // this.handleClick = this.handleClick.bind(this)
  }

  async componentDidMount() {
    const {data} = await axios.get('/auth/me')
    this.props.getCartThunk(data.id)
  }

  // handleClick() {
  //   this.props.checkoutThunk(this.props.cart.id)
  // }

  render() {
    const cart = this.props.cart
    if (!cart.length) return <div>Cart Is Empty - Go Pop Some Bottles!</div>
    else
      return (
        <div>
          <div className="cart">
            <div>Your Cart</div>
            <h2>There are {cart.quantity} items in your cart</h2>
            <h3>Total Price: {cart.totalCost}</h3>
            <ul>
              {cart.map(product => {
                return (
                  <div key={product.id}>
                    <button
                      type="button"
                      onClick={() => this.props.removeFromCartThunk(product.id)}
                    >
                      Remove from Cart
                    </button>
                    <p>Quantity: {product.productOrders.quantity || 1}</p>
                    <SingleProduct product={product} />
                  </div>
                )
              })}
            </ul>
          </div>
          <Link to="/checkout">
            <button name="Checkout" type="submit">
              Checkout
            </button>
          </Link>
        </div>
      )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cartReducer,
    user: state.user,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCartThunk: userId => dispatch(getCartThunk(userId)),
    removeFromCartThunk: productId => dispatch(removeFromCartThunk(productId)),
    checkoutThunk: cartId => dispatch(checkoutThunk(cartId)),
    loadInitialData: () => dispatch(loadInitialData(me()))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Viewcart)

Viewcart.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
