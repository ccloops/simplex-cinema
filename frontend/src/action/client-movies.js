import superagent from 'superagent';
import * as routes from '../routes';

export const createAction = movie => ({
  type: 'CLIENT_MOVIE_CREATE',
  payload: movie,
});

export const createActionRequest = movie => store => {
  const { token } = store.getState();
  console.log('MOVIE');

  return superagent.post(`${__API_URL__}${routes.MOVIES_ROUTE}`)
    .set('Authorization', `Bearer ${token}`)
    .field('genre', movie.genre)
    .field('rating', movie.rating)
    .field('title', movie.title)
    .attach('movie', movie.movie)
    .withCredentials()
    .then(response => {
      return store.dispatch(createAction(response.body));
    });
};
