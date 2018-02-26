import './_drop-zone.scss';
import React from 'react';

const DropZone = () => {

  const handleDragOver = event => {
    event.preventDefault();
  };

  const handleDrop = event => {
    try {
      let dragData = JSON.parse(event.dataTransfer.getData('application/json'));
      // do something
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

export default DropZone;
