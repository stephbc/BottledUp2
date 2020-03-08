import React from 'react'
import {connect} from 'react-redux'
import {fetchAllUsers} from '../store/admin'

class AllUsers extends React.Component {
  componentDidMount() {
    this.props.fetchAllUsers()
  }

  render() {
    const usersArray = this.props.users
    if (!usersArray) {
      return (
        <div>
          <p>
            There are no Users! We need to allocate more funds to our PR and
            Advertising departments!
          </p>
        </div>
      )
    } else {
      return (
        <div>
          <div className="users-container">
            <ul>
              {usersArray.map(user => {
                return (
                  <div key={user.id}>
                    <li>First:{user.firstName}</li>
                    <li>Last:{user.lastName}</li>
                    <li>Email:{user.email}</li>
                    <li>Address:{user.address}</li>
                  </div>
                )
              })}
            </ul>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  users: state.users.users
})

const mapDispatchToProps = dispatch => ({
  fetchAllUsers: () => dispatch(fetchAllUsers())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
