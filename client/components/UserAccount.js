import React from 'react'
import {connect} from 'react-redux'
import {me} from '../store'

export const UserAccount = props => {
  const {user} = props
  return (
    <div>
      {props.isLoggedIn ? (
        <div>
          <p>
            Name: {user.firstName} {user.lastName}
          </p>
          <p>Email: {user.email}</p>
          <p>Address: {user.address}</p>
          <p>Account Type: {user.accountType}</p>
          <button type="button">Change Password</button>
        </div>
      ) : (
        <div>
          <label htmlFor="name">Name:</label>
          <input name="name" />
          <label htmlFor="email">Email:</label>
          <input name="email" />
          <label htmlFor="address">Address:</label>
          <input name="address" />
          <label htmlFor="accountType">Account Type:</label>
          <input name="accountType" />
        </div>
      )}
    </div>
  )
}

const mapState = state => {
  return {
    user: state.user,
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

export default connect(mapState, mapDispatch)(UserAccount)
