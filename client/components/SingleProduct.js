import React from 'react'
import {Link} from 'react-router-dom'

const SingleProduct = props => {
  const {product} = props
  return (
    <div className="product">
      <Link to={`/products/${product.id}`} className="productLink">
        <img src={`${product.imgUrl}`} height="200" />
        <p>{product.name}</p>
        <p>{`$${product.price / 100}`}</p>
      </Link>
      <br />
    </div>
  )
}
export default SingleProduct
