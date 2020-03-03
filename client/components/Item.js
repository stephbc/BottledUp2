import React from 'react'
import {fetchSingleProduct} from '../store/product'
import {connect} from 'react-redux'

class Item extends React.Component {
  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.id)
  }

  render() {
    const {product} = this.props
    return (
      <div className="product">
        <img id="productpic" src={product.imageUrl} />
        <li>Price: {product.price}</li>
        <li>Type: {product.type}</li>
        <li>Made of: {product.material}</li>
        <li>Color: {product.color}</li>
        <li>About: {product.decription}</li>
        <li>Availability: {product.inventory}</li>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products.products
})

const mapDispatchToProps = dispatch => ({
  fetchSingleProduct: id => dispatch(fetchSingleProduct(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Item)
