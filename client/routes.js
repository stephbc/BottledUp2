import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome} from './components'
import LoginPage from './components/LoginPage'
import AllProducts from './components/AllProducts'
import UserAccount from './components/UserAccount'
import Item from './components/Item'
import AdminView from './components/AdminView'
import {me} from './store'
import Viewcart from './components/Viewcart'
import AllUsers from './components/AllUsers'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props
    console.log(this.props)
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={UserAccount} />
        <Route exact path="/products" component={AllProducts} />
        <Route exact path="/products/:id" component={Item} />
        <Route exact path="/viewcart" component={Viewcart} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            <Route path="/adminview" component={AdminView} />
            <Route exact path="/users" component={AllUsers} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={AllProducts} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
