import { combineReducers } from 'redux';

import token from './token';
import movieCategory from './movie-category';

export default combineReducers({
  token,
  movieCategory,
});
