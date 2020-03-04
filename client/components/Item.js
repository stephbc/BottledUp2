import React from 'react'
import {fetchSingleProduct} from '../store/product'
import {connect} from 'react-redux'

class Item extends React.Component {
  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.id)
  }

  render() {
    const {product} = this.props
    let directory = product.type
    console.log(directory)
    return (
      <div className="product">
        <img id="productpic" src={`${product.imgUrl}`} height="500" />
        {/* /public/products/${directory}/ */}
        <h2>{product.name}</h2>
        <h3>{`$${product.price / 100}`}</h3>
        <p>
          {product.material} {product.type} <br />
          Color: {product.color} <br />
          <br />
          {product.description}
        </p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  product: state.products.product
})

const mapDispatchToProps = dispatch => ({
  fetchSingleProduct: id => dispatch(fetchSingleProduct(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Item)
