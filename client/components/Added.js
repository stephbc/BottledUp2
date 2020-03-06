import React from 'react'

export const Added = props => {
  let quantity = props.quantity
  if (!props.buttonClick) {
    return <div />
  } else {
    return (
      <div>
        <p>Added {quantity} to Cart!</p>
      </div>
    )
  }
}
