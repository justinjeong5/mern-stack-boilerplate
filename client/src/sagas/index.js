import { all, fork } from 'redux-saga/effects'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000'
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([]);
}