import React from 'react'

export const Added = props => {
  let quantity = props.quantity
  if (!props.buttonClick) {
    return <div />
  } else if (quantity === 1) {
    return (
      <div>
        <p>Added to Cart!</p>
      </div>
    )
  } else
    return (
      <div>
        <p>Click again to put {quantity} in your Cart!</p>
      </div>
    )
}
