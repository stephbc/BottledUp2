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
      <div className="additem">
        <h4>ADD NEW ITEM: </h4>
        <form className="addform" onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="item-name">Item name: </label>
            <input
              onChange={this.handleChange}
              name="name"
              type="text"
              value={this.state.name}
              required
            />
            <br />
          </div>
          <div>
            <label htmlFor="item-type">
              Item type (must be bottle, lid, or straw):{' '}
            </label>
            <input
              onChange={this.handleChange}
              name="type"
              type="text"
              value={this.state.type}
              required
            />
            <br />
          </div>
          <div>
            <label htmlFor="item-materal">Item material: </label>
            <input
              onChange={this.handleChange}
              name="material"
              type="text"
              value={this.state.material}
              required
            />
            <br />
          </div>
          <div>
            <label htmlFor="item-price">Item price: </label>
            <input
              onChange={this.handleChange}
              name="price"
              type="text"
              value={this.state.price}
              required
            />
            <br />
          </div>
          <div>
            <label htmlFor="item-color">Item color: </label>
            <input
              onChange={this.handleChange}
              name="color"
              type="text"
              value={this.state.color}
            />
            <br />
          </div>
          <div>
            <label htmlFor="item-Url">Item image: </label>
            <input
              onChange={this.handleChange}
              name="imgUrl"
              type="text"
              value={this.state.imgUrl}
            />
            <br />
          </div>
          <div>
            <label htmlFor="item-description">Item description: </label>
            <input
              onChange={this.handleChange}
              name="description"
              type="text"
              value={this.state.description}
              required
            />
            <br />
            <button type="submit">ADD NEW ITEM</button>
            <br />
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addProductThunk: product => dispatch(addProductThunk(product))
})

export default connect(null, mapDispatchToProps)(AddProduct)
