export default (state = {}, { type, payload }) => {
  switch(type) {
    case 'CHANGE_DISPLAY':
      return payload;
    default:
      return state;
  }
};
