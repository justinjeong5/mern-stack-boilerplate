import { all, fork, put, call, takeLatest } from 'redux-saga/effects'
import axios from 'axios';

import {
  REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE,
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

function* watchRegister() {
  yield takeLatest(REGISTER_USER_REQUEST, register)
}


export default function* userSaga() {
  yield all([
    fork(watchRegister),
  ])
}