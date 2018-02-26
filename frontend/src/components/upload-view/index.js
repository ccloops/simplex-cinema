import './_upload-view.scss';
import React, { Component } from 'react';
import DropZone from '../drop-zone';

class UploadView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      genre: '',
      rating: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className='upload-view'>
        <h1>Upload</h1>
        <DropZone />
        <form className='movie-form' onSubmit={this.handleSubmit}>
          <label>Movie</label>
          <input
            type= 'file'
            name='movie'
            onChange={this.handleChange}
          />
          <input
            type='text'
            name='title'
            value={this.state.title}
            placeholder='title'
            onChange={this.handleChange}
            className='populated-field'
          />
          <input
            type='text'
            name='genre'
            value={this.state.genre}
            placeholder='genre'
            onChange={this.handleChange}
            className='populated-field'
          />
          <input
            type='text'
            name='rating'
            value={this.state.rating}
            placeholder='rating'
            onChange={this.handleChange}
            className='populated-field'
          />
          <label>Poster Art</label>
          <input
            type='file'
            name='poster'
            onChange={this.handleChange}
          />
          <br />
          <button type='submit'>Upload Movie</button>
        </form>
      </div>
    );
  }
}

export default UploadView;
