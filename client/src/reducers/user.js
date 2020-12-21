import {
  REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE,
} from './types'

const initialState = {
  currentUser: null,
  message: '',

  registerUserLoading: false,
  registerUserDone: false,
  registerUserError: null,
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return {
        ...state,
        registerUserLoading: true,
        registerUserDone: false,
        registerUserError: null,
      }
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        registerUserLoading: false,
        registerUserDone: true,
        message: action.payload.message,
      }
    case REGISTER_USER_FAILURE:
      return {
        ...state,
        registerUserLoading: false,
        registerUserError: action.error.code,
        message: action.error.message,
      }
    default:
      return state;
  }
}

export default user;