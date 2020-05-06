import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

export class Navbar extends React.Component {
  render() {
    if (
      this.props.user.accountType === 'Admin' &&
      this.props.isLoggedIn === true
    ) {
      return (
        <div>
          <h1 className="title">BOTTLED UP</h1>
          <nav>
            <div className="navlinks">
              <div>
                <Link to="/home">Home</Link>
                <Link to="/products">All Products</Link>
              </div>
              <div>
                <Link to="/viewcart">View Cart</Link>
                <Link to="/signup">My Account</Link>
                <Link to="/adminview">Admin View</Link>
                <a href="#" onClick={this.props.handleClick}>
                  Logout
                </a>
              </div>
            </div>
          </nav>
        </div>
      )
    } else {
      return (
        <div>
          <h1 className="title">BOTTLED UP</h1>
          <nav>
            {this.props.isLoggedIn ? (
              <div className="navlinks">
                {/* The navbar will show these links after you log in */}
                <div>
                  <Link to="/home">Home</Link>
                  <Link to="/products">All Products</Link>
                </div>
                <div>
                  <Link to="/viewcart">View Cart</Link>
                  <Link to="/signup">My Account</Link>
                  <a href="#" onClick={this.props.handleClick}>
                    Logout
                  </a>
                </div>
              </div>
            ) : (
              <div className="navlinks">
                {/* The navbar will show these links before you log in */}
                <div>
                  <Link to="/products">All Products</Link>
                </div>
                <div>
                  <Link to="/viewcart">View Cart</Link>
                  <Link to="/signup">Sign Up</Link>
                  <Link to="/login">Login</Link>
                </div>
              </div>
            )}
          </nav>
          <hr />
        </div>
      )
    }
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
