import './_drop-zone.scss';
import React from 'react';
import { connect } from 'react-redux';

import { createActionRequest } from '../../action/client-movies';

const DropZone = ({ createMovie }) => {

  const handleDragOver = event => {
    event.preventDefault();
  };

  const handleDrop = event => {
    event.preventDefault();
    event.stopPropagation();

    console.log(event.dataTransfer);

    try {
      let dragData = JSON.parse(event.dataTransfer.getData('application/json'));
      this.props.createMovie(dragData);
    } catch (error) {
      console.log('__BAD_DRAG_DATA__', error);
    }
  };

  return (
    <div
      className='drop-zone'
      onDragOver={handleDragOver}
      onDrop={handleDrop}>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  createMovie: movie => dispatch(createActionRequest(movie)),
});


export default connect(null, mapDispatchToProps)(DropZone);
