import { USER_LOGIN } from '../actions/userAction'

initialState = {
  isLogin: false,
  isLogout: false,
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        isLogin: true
      }
    default:
      return state
  }
}
export default user
