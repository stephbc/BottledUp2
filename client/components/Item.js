import React from 'react'
import {fetchSingleProduct, clearSingleProduct} from '../store/product'
import {addToCartThunk, updateQuantityThunk} from '../store/cart'
import {connect} from 'react-redux'
import ItemForm from './ItemForm'
import {Added} from './Added'

class Item extends React.Component {
  constructor() {
    super()
    this.state = {
      buttonClick: false,
      quantity: 1
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.id)
  }
  componentWillUnmount() {
    this.props.clearSingleProduct()
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleClick = id => {
    this.props.addToCartThunk(id)
    this.props.updateQuantityThunk(id, this.state.quantity)
    this.setState({buttonClick: true})
  }

  render() {
    const {product} = this.props
    if (!product.id) return <div>Loading...</div>
    return (
      <div className="product">
        <img id="productpic" src={`${product.imgUrl}`} height="500" />
        {/* /public/products/${directory}/ */}
        <h2>{product.name}</h2>
        <h3>{`$${product.price / 100}`}</h3>
        <input
          onChange={this.handleChange}
          name="quantity"
          type="number"
          value={this.state.quantity}
        />
        <button type="button" onClick={() => this.handleClick(product.id)}>
          {' '}
          ADD TO CART{' '}
        </button>
        <Added
          buttonClick={this.state.buttonClick}
          quantity={this.state.quantity}
        />
        <p>
          {product.material} {product.type} <br />
          Color: {product.color} <br />
          <br />
          {product.description}
        </p>
        <br />
        <div className="admin-update">
          <ItemForm product={product} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  product: state.products.product,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  fetchSingleProduct: id => dispatch(fetchSingleProduct(id)),
  clearSingleProduct: () => dispatch(clearSingleProduct()),
  addToCartThunk: id => dispatch(addToCartThunk(id)),
  updateQuantityThunk: (id, qty) => dispatch(updateQuantityThunk(id, qty))
})

export default connect(mapStateToProps, mapDispatchToProps)(Item)
