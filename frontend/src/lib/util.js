import superagent from 'superagent';
import * as routes from '../routes';

export const getMovieById = id => {
  return superagent.get(`${__API_URL__}${routes.MOVIES_ROUTE}/${id}`);
};
