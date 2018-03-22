import superagent from 'superagent';
import * as routes from '../routes';
import { progressAction } from './upload-progress';

export const getAction = movies => ({
  type: 'CLIENT_MOVIE_GET',
  payload: movies,
});

export const createAction = movie => ({
  type: 'CLIENT_MOVIE_CREATE',
  payload: movie,
});

export const createActionRequest = movie => store => {
  const { token } = store.getState();

  console.log(movie);

  return superagent.post(`${__API_URL__}${routes.MOVIES_ROUTE}`)
    .set('Authorization', `Bearer ${token}`)
    .field('genre', movie.genre)
    .field('rating', movie.rating)
    .field('title', movie.title)
    .attach('movie', movie.movie)
    .attach('poster', movie.poster)
    .on('progress', event => {
      return store.dispatch(progressAction(event.percent));
    })
    .withCredentials()
    .then(response => {
      return store.dispatch(createAction(response.body));
    });
};

export const getActionRequest = movie => store => {
  return superagent.get(`${__API_URL__}${routes.MOVIES_ROUTE}`)
    .then(response => {
      return store.dispatch(getAction(response.body.data));
    });
};
