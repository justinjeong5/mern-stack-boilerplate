import { all, fork, put, call, takeLatest } from 'redux-saga/effects'
import axios from 'axios';

import {
  REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE,
  LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE,
  LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAILURE,
  AUTHENTICATE_USER_REQUEST, AUTHENTICATE_USER_SUCCESS, AUTHENTICATE_USER_FAILURE,
  EDIT_USER_REQUEST, EDIT_USER_SUCCESS, EDIT_USER_FAILURE,
  CONFIRM_USER_REQUEST, CONFIRM_USER_SUCCESS, CONFIRM_USER_FAILURE,
} from '../reducers/types'

function registerAPI(data) {
  return axios.post('/api/user/register', data)
}

function* register(action) {
  try {
    const result = yield call(registerAPI, action.payload);
    yield put({
      type: REGISTER_USER_SUCCESS,
      payload: result.data,
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: REGISTER_USER_FAILURE,
      error: error.response.data,
    })
  }
}

function loginAPI(data) {
  return axios.post('/api/user/login', data)
}

function* login(action) {
  try {
    const result = yield call(loginAPI, action.payload);
    yield put({
      type: LOGIN_USER_SUCCESS,
      payload: result.data,
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: LOGIN_USER_FAILURE,
      error: error.response.data,
    })
  }
}

function logoutAPI() {
  return axios.get('/api/user/logout')
}

function* logout() {
  try {
    const result = yield call(logoutAPI);
    yield put({
      type: LOGOUT_USER_SUCCESS,
      payload: result.data,
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: LOGOUT_USER_FAILURE,
      error: error.response.data,
    })
  }
}

function authenticateAPI() {
  return axios.get('/api/user/auth')
}

function* authenticate() {
  try {
    const result = yield call(authenticateAPI);
    yield put({
      type: AUTHENTICATE_USER_SUCCESS,
      payload: result.data,
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: AUTHENTICATE_USER_FAILURE,
      error: error.response.data,
    })
  }
}

function confirmAPI(data) {
  return axios.post('/api/user/confirm', data)
}

function* confirm(action) {
  try {
    const result = yield call(confirmAPI, action.payload);
    yield put({
      type: CONFIRM_USER_SUCCESS,
      payload: result.data,
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: CONFIRM_USER_FAILURE,
      error: error.response.data,
    })
  }
}

function editAPI(data) {
  return axios.post('/api/user/edit', data)
}

function* edit(action) {
  try {
    const result = yield call(editAPI, action.payload);
    yield put({
      type: EDIT_USER_SUCCESS,
      payload: result.data,
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: EDIT_USER_FAILURE,
      error: error.response.data,
    })
  }
}

function* watchRegister() {
  yield takeLatest(REGISTER_USER_REQUEST, register)
}

function* watchLogin() {
  yield takeLatest(LOGIN_USER_REQUEST, login)
}

function* watchLogout() {
  yield takeLatest(LOGOUT_USER_REQUEST, logout)
}

function* watchAuthenticate() {
  yield takeLatest(AUTHENTICATE_USER_REQUEST, authenticate)
}

function* watchConfirm() {
  yield takeLatest(CONFIRM_USER_REQUEST, confirm)
}

function* watchEdit() {
  yield takeLatest(EDIT_USER_REQUEST, edit)
}


export default function* userSaga() {
  yield all([
    fork(watchRegister),
    fork(watchLogin),
    fork(watchLogout),
    fork(watchAuthenticate),
    fork(watchEdit),
    fork(watchConfirm),
  ])
}