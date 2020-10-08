import { USER_LOGIN, USER_LOGOUT, LOADING, INSTRUCTOR, USER_REGISTERED,  } from '../actions/userAction'

initialState = {
  isLoading: false,
  isLogin: false,
  isInstructor: false,
  isRegistered: false,
  userData: null,
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_REGISTERED:
      return {
        ...state,
        isRegistered: action.payload,
        isLoading: false,
      }
    case USER_LOGIN:
      return {
        ...state,
        isLogin: true,
        isLoading: false,
        userData: action.payload
      }
    case INSTRUCTOR:
      return {
        ...state,
        isInstructor: true,
        isLogin: true,
        isLoding: false,
        userData: action.payload
      }
    case USER_LOGOUT:
      return {
        ...state,
        isInstructor: false,
        isLogin: false,
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
