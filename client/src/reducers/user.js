import {
  REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE,
  LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE,
  LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAILURE,
  AUTHENTICATE_USER_REQUEST, AUTHENTICATE_USER_SUCCESS, AUTHENTICATE_USER_FAILURE,
  EDIT_USER_REQUEST, EDIT_USER_SUCCESS, EDIT_USER_FAILURE,
  CONFIRM_USER_REQUEST, CONFIRM_USER_SUCCESS, CONFIRM_USER_FAILURE,
} from './types'

const initialState = {
  currentUser: null,
  message: '',

  registerUserLoading: false,
  registerUserDone: false,
  registerUserError: null,
  loginUserLoading: false,
  loginUserDone: false,
  loginUserError: null,
  logoutUserLoading: false,
  logoutUserDone: false,
  logoutUserError: null,
  authenticateUserLoading: false,
  authenticateUserDone: false,
  authenticateUserError: null,
  confirmUserLoading: false,
  confirmUserDone: false,
  confirmUserError: null,
  editUserLoading: false,
  editUserDone: false,
  editUserError: null,
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
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        loginUserLoading: true,
        loginUserDone: false,
        loginUserError: null,
      }
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loginUserLoading: false,
        loginUserDone: true,
        currentUser: { ...action.payload.payload },
        message: action.payload.message,
      }
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        loginUserLoading: false,
        loginUserError: action.error.code,
        message: action.error.message,
      }
    case LOGOUT_USER_REQUEST:
      return {
        ...state,
        logoutUserLoading: true,
        logoutUserDone: false,
        logoutUserError: null,
      }
    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        logoutUserLoading: false,
        logoutUserDone: true,
        currentUser: null,
        message: action.payload.message,
      }
    case LOGOUT_USER_FAILURE:
      return {
        ...state,
        logoutUserLoading: false,
        logoutUserError: action.error.code,
        message: action.error.message,
      }
    case AUTHENTICATE_USER_REQUEST:
      return {
        ...state,
        authenticateUserLoading: true,
        authenticateUserDone: false,
        authenticateUserError: null,
      }
    case AUTHENTICATE_USER_SUCCESS:
      return {
        ...state,
        authenticateUserLoading: false,
        authenticateUserDone: true,
        currentUser: { ...action.payload.payload },
        message: action.payload.message,

        registerUserLoading: false,
        registerUserDone: false,
        registerUserError: null,
        loginUserLoading: false,
        loginUserDone: false,
        loginUserError: null,
        logoutUserLoading: false,
        logoutUserDone: false,
        logoutUserError: null,
        confirmUserLoading: false,
        confirmUserDone: false,
        confirmUserError: null,
        editUserLoading: false,
        editUserDone: false,
        editUserError: null,
      }
    case AUTHENTICATE_USER_FAILURE:
      return {
        ...state,
        authenticateUserLoading: false,
        authenticateUserError: action.error.code,
        message: action.error.message,
      }
    case CONFIRM_USER_REQUEST:
      return {
        ...state,
        confirmUserLoading: true,
        confirmUserDone: false,
        confirmUserError: null,
      }
    case CONFIRM_USER_SUCCESS:
      return {
        ...state,
        confirmUserLoading: false,
        confirmUserDone: true,
        message: action.payload.message,
      }
    case CONFIRM_USER_FAILURE:
      return {
        ...state,
        confirmUserLoading: false,
        confirmUserError: action.error.code,
        message: action.error.message,
      }
    case EDIT_USER_REQUEST:
      return {
        ...state,
        editUserLoading: true,
        editUserDone: false,
        editUserError: null,
      }
    case EDIT_USER_SUCCESS:
      return {
        ...state,
        editUserLoading: false,
        editUserDone: true,
        currentUser: { isAuth: true },
        message: action.payload.message,
      }
    case EDIT_USER_FAILURE:
      return {
        ...state,
        editUserLoading: false,
        editUserError: action.error.code,
        message: action.error.message,
      }
    default:
      return state;
  }
}

export default user;