export default (state = [], { type, payload }) => {
  switch(type) {
    case 'UPLOAD_PROGRESS':
      return payload;
    default:
      return state;
  }
};
