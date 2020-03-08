import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Route, Link} from 'react-router-dom'
import AllProducts from './AllProducts'
import AllUsers from './AllUsers'

class AdminView extends Component {
  render() {
    console.log('props from adminview', this.props)
    if (this.props.user.accountType === 'Admin') {
      return (
        <div>
          <div>
            <p>Products</p>
            <Link to="/products">
              <img
                src="https://png.pngtree.com/png-vector/20191115/ourlarge/pngtree-bottles-icons-set-flat-style-png-image_1980191.jpg"
                height="200"
              />
            </Link>
            <p>Users</p>
            <Link to="/users">
              <img
                src="https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/users_crowd.png"
                height="200"
              />
            </Link>
          </div>
          <div>
            <Route exact path="/products" component={AllProducts} />
            <Route exact path="/users" component={AllUsers} />
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <p>You are not supposed to be here!</p>
        </div>
      )
    }
  }
}
const mapStateToProps = state => ({
  user: state.user
})
export default connect(mapStateToProps)(AdminView)
