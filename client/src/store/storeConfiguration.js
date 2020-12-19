import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from '../reducers';
import rootSaga from '../sagas';

const loggerMiddleware = ({ dispatch, getState }) => (next) => (action) => {
  console.log(action);
  return next(action);
};

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, loggerMiddleware];
const enhancer = composeWithDevTools(applyMiddleware(...middlewares));
const store = createStore(rootReducer, enhancer, window.__REDUX_DEVTOOLS_EXTIONSION__ && window.__REDUX_DEVTOOLS_EXTIONSION__());
store.sagaTask = sagaMiddleware.run(rootSaga);

export default store;