import React from 'react'
import {Link} from 'react-router-dom'

const SingleProduct = props => {
  const {product} = props
  return (
    <div className="product">
      <img id="productPic" src={product.imageUrl} />
      <h2>
        <Link to={`/products/${product.id}`}>{product.name}</Link>
      </h2>
      <li>Price: {product.price}</li>
      <li>Type: {product.type}</li>
      <li>Made of: {product.material}</li>
      <li>Color: {product.color}</li>
      <li>About: {product.decription}</li>
      <li>Availability: {product.inventory}</li>
    </div>
  )
}
export default SingleProduct
