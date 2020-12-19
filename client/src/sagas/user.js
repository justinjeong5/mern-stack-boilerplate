import { all, fork, put, call, takeLatest } from 'redux-saga/effects'
import axios from 'axios';

import {

} from '../reducers/types'

function UserAPI(data) {
  return axios.post('', data)
}

function* user(action) {
  try {
    yield call(UserAPI, action.payload);
    yield put({

    })
  } catch (error) {
    console.error(error)
    yield put({

    })
  }
}

function* watchUser() {
  yield takeLatest(User_USER_REQUEST, user)
}

export default function* userSaga() {
  yield all([
    fork(watchUser),
  ])
}