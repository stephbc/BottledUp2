import axios from 'axios'

const GET_ALL_USERS = 'GET_ALL_USERS'

const getAllUsers = users => {
  return {
    type: GET_ALL_USERS,
    users
  }
}

export const fetchAllUsers = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/users')
      dispatch(getAllUsers(data))
    } catch (error) {
      console.error(error)
    }
  }
}

const initialState = {
  users: []
}

function adminReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return {...state, users: [...action.users]}
    default:
      return state
  }
}

export default adminReducer
