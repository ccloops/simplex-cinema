import './_drop-zone.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import dragDrop from 'drag-drop';

import { createActionRequest } from '../../action/client-movies';

class DropZone extends Component {
  componentDidMount() {
    dragDrop('.drop-zone', {
      onDrop: files => {
        this.props.handleDrop(files);
      },
    });
  }

  handleDragOver(event){
    event.preventDefault();
  }

  render() {
    return (
      <div
        className='drop-zone'
        onDragOver={this.props.handleDragOver}
      >
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  createMovie: movie => dispatch(createActionRequest(movie)),
});


export default connect(null, mapDispatchToProps)(DropZone);
