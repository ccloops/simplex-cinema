import './_drop-zone.scss';
import React from 'react';
import { connect } from 'react-redux';
import dragDrop from 'drag-drop';

import { createActionRequest } from '../../action/client-movies';

const DropZone = ({ createMovie, onChange }) => {

  const handleDragOver = event => {
    event.preventDefault();
  };

  const handleDrop = event => {
    event.preventDefault();
    event.persist();
    event.stopPropagation();

    try {
      dragDrop('.drop-zone', {
        onDrop: files => {
          if (files.type )
          const event = {};
          event.target = {
            name: ''
          }
          onChange(files[0]);
        },
      });
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
