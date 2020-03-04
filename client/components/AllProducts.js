import React from 'react'
import {connect} from 'react-redux'
import {fetchAllProducts} from '../store/product'
import SingleProduct from './SingleProduct'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchAllProducts()
  }

  render() {
    const productArray = this.props.products

    if (!productArray) {
      return (
        <div>
          <p>
            Why is it so empty in here? Call the police! Someone stole our
            bottles!
          </p>
        </div>
      )
    } else {
      return (
        <div>
          <div className="products-container">
            <ul>
              {productArray.map(product => {
                return <SingleProduct product={product} key={product.id} />
              })}
            </ul>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  products: state.products.products
})

const mapDispatchToProps = dispatch => ({
  fetchAllProducts: () => dispatch(fetchAllProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
