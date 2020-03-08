import React from 'react'
import {connect} from 'react-redux'
import {addProductThunk} from '../store/product'

export class AddProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      type: '',
      material: '',
      price: '',
      color: '',
      imgUrl: '',
      description: ''
    }
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
    this.props.addProductThunk(this.state)
    this.setState({
      name: '',
      type: '',
      material: '',
      price: '',
      color: '',
      imgUrl: '',
      description: ''
    })
  }

  render() {
    return (
      <div>
        <h4>ADD NEW ITEM: </h4>
        <form onSubmit={this.handleSubmit}>
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
          <label htmlFor="item-Url">Item image: </label>
          <input
            onChange={this.handleChange}
            name="imgUrl"
            type="text"
            value={this.state.imgUrl}
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
          <button type="submit">ADD NEW ITEM</button>
          <br />
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addProductThunk: product => dispatch(addProductThunk(product))
})

export default connect(null, mapDispatchToProps)(AddProduct)
