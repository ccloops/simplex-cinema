import { combineReducers } from 'redux';

import token from './token';
import display from './change-display';
import clientMovies from './client-movies';

export default combineReducers({
  token,
  display,
  clientMovies,
});
