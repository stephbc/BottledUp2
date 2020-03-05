import React from 'react'
import {connect} from 'react-redux'

export const UserAccount = props => {
  console.log(props)
  const {user} = props
  return (
    <div>
      <p>
        Name: {user.firstName} {user.lastName}
      </p>
      <p>Email: {user.email}</p>
      <p>Address: {user.address}</p>
      <p>Account Type: {user.accountType}</p>
      <button type="button">Change Password</button>
    </div>
  )
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(UserAccount)
