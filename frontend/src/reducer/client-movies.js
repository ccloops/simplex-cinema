export const validateMovie = movie => {
  if (!movie) {
    throw new Error('a movie was required');
  }
};

export default (state = [], { type, payload }) => {
  switch(type) {
    case 'CLIENT_MOVIE_CREATE':
      validateMovie(payload);
      return [payload, ...state];
    case 'CLIENT_MOVIE_GET':
      return payload;
    default:
      return state;
  }
};
