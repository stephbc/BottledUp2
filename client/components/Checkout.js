import React from 'react'
import {connect} from 'react-redux'
import checkoutThunk from '../store/cart'

class Checkout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleClick = this.handleClick.bind(this)
    this.handlChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: [event.target.value]
    })
  }

  handleClick() {
    let address = [
      this.state.street,
      this.state.city,
      this.state.state,
      this.state.zipcod,
      this.state.country
    ]
    let billingInfo = [
      this.state.cardNumber,
      this.state.expMonth,
      this.state.expYear,
      this.state.cvc
    ]
    this.props.checkoutThunk(this.props.cart.id, address, billingInfo)
  }

  render() {
    // const cart = this.props.cart
    const {user} = this.props
    return (
      <div>
        <div className="checkout">
          <h2>Checkout</h2>
        </div>

        <form onSubmit={this.handleSubmit}>
          <div id="address">
            <h3>1 Shipping address</h3>
            <label htmlFor="street">Street</label>
            <input type="text" name="street" onChange={this.handleChange} />
            <label htmlFor="city">City</label>
            <input type="text" name="city" onChange={this.handleChange} />
            <label htmlFor="state">State</label>
            <input type="text" name="state" onChange={this.handleChange} />
            <label htmlFor="zipcode">Zipcode</label>
            <input type="text" name="zipcode" onChange={this.handleChange} />
            <label htmlFor="country">Country</label>
            <input type="text" name="country" onChange={this.handleChange} />
            <br />
          </div>

          <div id="payment">
            <h3>2 Payment method</h3>
            <div>
              <label htmlFor="cardNumber">Card Number</label>
              <input
                onChange={this.handleChange}
                name="cardNumber"
                type="number"
              />
            </div>

            <div>
              <label htmlFor="expMonth">Expiration Month</label>
              <select onChange={this.handleChange} name="expMonth">
                {[
                  '01',
                  '02',
                  '03',
                  '04',
                  '05',
                  '06',
                  '07',
                  '08',
                  '09',
                  '10',
                  '11',
                  '12'
                ].map(month => <option key={month}>{month}</option>)}
              </select>
            </div>
            <br />
            <div>
              <label htmlFor="expYear">Expiration Year</label>
              <select onChange={this.handleChange} name="expYear">
                {[
                  '2020',
                  '2021',
                  '2022',
                  '2023',
                  '2024',
                  '2025',
                  '2026',
                  '2027',
                  '2028',
                  '2029',
                  '2030'
                ].map(year => <option key={year}>{year}</option>)}
              </select>
            </div>
            <br />
            <div>
              <label htmlFor="cvc">CVC</label>
              <input onChange={this.handleChange} name="cvc" type="number" />
            </div>
            <button type="submit">Submit</button>

            <div className="ordersummary">
              <h3>3 Order Summary</h3>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cartId: state.cartId,
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    checkoutThunk: cartId => dispatch(checkoutThunk(cartId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
