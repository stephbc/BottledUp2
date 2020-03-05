import React from 'react'
import {connect} from 'react-redux'
import {fetchAllProducts, deleteProductThunk} from '../store/product'
import SingleProduct from './SingleProduct'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchAllProducts()
  }

  render() {
    const productArray = this.props.products
    console.log(this.state)
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
                return (
                  <div key={product.id}>
                    {/* <button
                      type="button"
                      onClick={ () => this.props.deleteProductThunk(product.id) }>
                      DELETE ITEM
                    </button> */}
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
  products: state.products.products
})

const mapDispatchToProps = dispatch => ({
  fetchAllProducts: () => dispatch(fetchAllProducts()),
  deleteProductThunk: id => dispatch(deleteProductThunk(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
