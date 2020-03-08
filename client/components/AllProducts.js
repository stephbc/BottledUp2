import React from 'react'
import {connect} from 'react-redux'
import {fetchAllProducts, deleteProductThunk} from '../store/product'
import SingleProduct from './SingleProduct'
import AddProduct from './AddProduct'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchAllProducts()
  }

  render() {
    const productArray = this.props.products
    if (this.props.user.accountType === 'Admin') {
      return (
        <div>
          <AddProduct />
          <div className="products-container">
            <ul>
              {productArray.map(product => {
                return (
                  <div key={product.id}>
                    <button
                      type="button"
                      onClick={() => this.props.deleteProductThunk(product.id)}
                    >
                      DELETE ITEM
                    </button>
                    <SingleProduct product={product} />
                  </div>
                )
              })}
            </ul>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <div className="products-container">
            <ul>
              {productArray.map(product => {
                return (
                  <div key={product.id}>
                    <SingleProduct product={product} />
                  </div>
                )
              })}
            </ul>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  products: state.products.products,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  fetchAllProducts: () => dispatch(fetchAllProducts()),
  deleteProductThunk: id => dispatch(deleteProductThunk(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
