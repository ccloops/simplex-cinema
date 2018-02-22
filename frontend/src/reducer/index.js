import { combineReducers } from 'redux';

import token from './token';
import display from './change-display';

export default combineReducers({
  token,
  display,
});
