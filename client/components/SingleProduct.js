import React from 'react'
import {Link} from 'react-router-dom'

const SingleProduct = props => {
  const {product} = props
  return (
    <div className="product">
      <Link to={`/products/${product.id}`}>
        <img id="productPic" src={`${product.imgUrl}`} height="200" />
        <h4>{product.name}</h4>
        <p>{`$${product.price / 100}`}</p>
      </Link>
      <br />
    </div>
  )
}
export default SingleProduct
