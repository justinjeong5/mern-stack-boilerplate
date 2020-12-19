import { combineReducers } from 'redux'

import user from './user'

const rootReducer = (state, action) => {
  const combineReducer = combineReducers({
    user,
  })
  return combineReducer(state, action);
};

export default rootReducer;