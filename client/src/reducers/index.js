import { combineReducers } from 'redux'

const rootReducer = (state, action) => {
  const combineReducer = combineReducers({})
  return combineReducer(state, action);
};

export default rootReducer;