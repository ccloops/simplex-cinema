import './_upload-view.scss';
import React, { Component } from 'react';

import { getFileType, isVideo, isImage } from '../../lib/util';
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
    this.validateDrop = this.validateDrop.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  handleChange(event) {
    const { type, name, value, files } = event.target;
    if (type === 'file') {
      // for poster art preview in browser
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

  validateDrop(files) {
    console.log(files);
    console.log(files[0] instanceof File);
    const type1 = getFileType(files[0]);
    const type2 = getFileType(files[1]);

    if (files.length > 2) {
      return;
    }

    // 1 image and 1 video
    if (files.length === 2) {
      if (isVideo(type1) && isVideo(type2)) {
        return;
      }

      if (isImage(type1) && isImage(type2)) {
        return;
      }

      // arrange so that image is first, video is second
      if (isImage(type1) && isVideo(type2)) {
        return files;
      }
      if (isVideo(type1) && isImage(type2)) {
        const arrangedFiles = [];
        arrangedFiles[0] = files[1];
        arrangedFiles[1] = files[0];
        return arrangedFiles;
      }

      return;
    }

    // 1 image or 1 video
    if (files.length === 1) {
      return files;
    }
  }

  handleDrop(files) {
    const validatedFiles = this.validateDrop(files);
    if (validatedFiles.length === 2) {
      console.log(validatedFiles);
      this.setState({
        poster: validatedFiles[0],
        movie: validatedFiles[1],
      });
    } else {
      const type = getFileType(files[0]);
      if (isVideo(type)) {

      }
      if (isImage(type)) {

      }
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
        <DropZone handleDrop={this.handleDrop}/>
        <form className='movie-form' onSubmit={this.handleSubmit}>
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
          <React.Fragment></React.Fragment>
          <input
            type='file'
            name='poster'
            onChange={this.handleChange}
            className='file-field poster'
          />
          <label>Movie</label>
          <input
            type= 'file'
            name='movie'
            onChange={this.handleChange}
            className='file-field movie'
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
