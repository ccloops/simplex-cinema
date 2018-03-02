export const validateMovie = movie => {
  if (!movie) {
    throw new Error('a movie was required');
  }
};

export default (state = [], { type, payload }) => {
  switch(type) {
    case 'CLIENT_PHOTO_CREATE':
      validateMovie(payload);
      return [payload, ...state];
    default:
      return state;
  }
};
