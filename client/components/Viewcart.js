import React from 'react'
import {connect} from 'react-redux'
import {getCartThunk} from '../store/cart'

class Viewcart extends React.Component {
  componentDidMount() {
    this.props.getCartThunk()
  }

  render() {
    // const { cart } = this.props;
    return (
      <div>
        <div className="cart">
          <div>Viewcart</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log(state.cart)
  return {
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => ({
  getCartThunk: () => dispatch(getCartThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(Viewcart)
