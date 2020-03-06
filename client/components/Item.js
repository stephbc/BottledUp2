import React from 'react'
import {fetchSingleProduct, clearSingleProduct} from '../store/product'
import {addToCartThunk} from '../store/cart'
import {connect} from 'react-redux'
import ItemForm from './ItemForm'
// import { addToCart } from '../store/cart'

class Item extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.id)
  }
  componentWillUnmount() {
    this.props.clearSingleProduct()
  }

  handleClick = id => {
    this.props.addToCartThunk(id)
    Window.alert('Added to Cart!')
  }

  render() {
    const {product} = this.props
    console.log('from render', this.state)
    if (!product.id) return <div>Loading...</div>
    return (
      <div className="product">
        <img id="productpic" src={`${product.imgUrl}`} height="500" />
        {/* /public/products/${directory}/ */}
        <h2>{product.name}</h2>
        <h3>{`$${product.price / 100}`}</h3>
        <button type="button" onClick={() => this.handleClick(product.id)}>
          {' '}
          ADD TO CART{' '}
        </button>
        <p>
          {product.material} {product.type} <br />
          Color: {product.color} <br />
          <br />
          {product.description}
        </p>
        <br />
        <div className="admin-update">
          <h4>UPDATE: </h4>
          <ItemForm product={product} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  product: state.products.product
})

const mapDispatchToProps = dispatch => ({
  fetchSingleProduct: id => dispatch(fetchSingleProduct(id)),
  clearSingleProduct: () => dispatch(clearSingleProduct()),
  addToCartThunk: id => dispatch(addToCartThunk(id))
  // addToCart: id => dispatch(addToCart(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Item)
