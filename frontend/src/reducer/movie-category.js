export default (state = {}, { type, payload }) => {
  switch(type) {
    case 'TOGGLE_CATEGORY':
      return payload;
    default:
      return state;
  }
};
