import React from 'react'
import {fetchSingleProduct} from '../store/product'
import {connect} from 'react-redux'
import ItemForm from './ItemForm'
// import { addToCart } from '../store/cart'

class Item extends React.Component {
  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.id)
  }

  // handleClick = id => {
  //   this.props.addToCart(id);
  // }

  render() {
    const {product} = this.props
    // let directory = product.type
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
  fetchSingleProduct: id => dispatch(fetchSingleProduct(id))
  // addToCart: id => dispatch(addToCart(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Item)
