import './_drop-zone.scss';

import dragDrop from 'drag-drop';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import FaUpload from 'react-icons/lib/fa/upload';

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
        <FaUpload className='fa-upload'/>
        <p>Choose a movie or drag and drop it here</p>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  createMovie: movie => dispatch(createActionRequest(movie)),
});


export default connect(null, mapDispatchToProps)(DropZone);
