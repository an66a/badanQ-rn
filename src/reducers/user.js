import { USER_LOGIN, LOADING, INSTRUCTOR } from '../actions/userAction'

initialState = {
  isLoading: false,
  isLogin: false,
  isLogout: false,
  isMember: false,
  isInstructor: false,
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        isLogin: true,
        isLoading: false,
      }
    case INSTRUCTOR:
      return {
        ...state,
        isInstructor: true,
      }
    case LOADING:
      return {
        ...state,
        isLoading: action.payload
      }
    default:
      return state
  }
}
export default user
