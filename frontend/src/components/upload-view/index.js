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
    const { type, name, value, files } = event.target;
    if (type === 'file') {
      // const error = this.handleValidate(event.target);
      if (name === 'poster') {
        fileToDataURL(files[0])
          .then(posterPreview => this.setState({ posterPreview }));
      }

      this.setState({
        [name]: files[0],
      });
    } else {
      this.setState({ [name]: value });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onComplete(this.state);
    this.setState({
      title: '',
      genre: '',
      rating: '',
    });
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

const fileToDataURL = file => {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(new Error('file required'));
    }

    const reader = new FileReader();

    reader.addEventListener('load', () => resolve(reader.result));
    reader.addEventListener('error', reject);

    return reader.readAsDataURL(file);
  });
};

export default UploadView;
