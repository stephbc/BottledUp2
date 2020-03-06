import React from 'react'
import {connect} from 'react-redux'
import {updateProductThunk} from '../store/product'

export class ItemForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.props.product
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const product = this.props.updateProductThunk(this.state)
    this.setState(product)
  }

  render() {
    if (this.props.user.accountType === 'Admin') {
      return (
        <div>
          <h4>UPDATE: </h4>
          <form onSubmit={evt => this.handleSubmit(evt)}>
            <label htmlFor="item-name">Item name: </label>
            <input
              onChange={this.handleChange}
              name="name"
              type="text"
              value={this.state.name}
            />
            <br />
            <label htmlFor="item-type">Item type: </label>
            <input
              onChange={this.handleChange}
              name="type"
              type="text"
              value={this.state.type}
            />
            <br />
            <label htmlFor="item-materal">Item material: </label>
            <input
              onChange={this.handleChange}
              name="material"
              type="text"
              value={this.state.material}
            />
            <br />
            <label htmlFor="item-price">Item price: </label>
            <input
              onChange={this.handleChange}
              name="price"
              type="text"
              value={this.state.price}
            />
            <br />
            <label htmlFor="item-color">Item color: </label>
            <input
              onChange={this.handleChange}
              name="color"
              type="text"
              value={this.state.color}
            />
            <br />
            <label htmlFor="item-description">Item description: </label>
            <input
              onChange={this.handleChange}
              name="description"
              type="text"
              value={this.state.description}
            />
            <br />
            <button type="submit">UPDATE ITEM</button>
            <br />
          </form>
        </div>
      )
    } else {
      return <div />
    }
  }
}

const mapStateToProps = state => ({
  product: state.products.product,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  updateProductThunk: product => dispatch(updateProductThunk(product))
})

export default connect(mapStateToProps, mapDispatchToProps)(ItemForm)
