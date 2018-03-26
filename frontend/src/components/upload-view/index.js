import './_upload-view.scss';
import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete';

import { getFileType, isVideo, isImage } from '../../lib/util';
import { SEARCH_BY_TITLE } from '../../api';
import { menuStyling } from './menu-styling';

import DropZone from '../drop-zone';
import ProgressBar from '../progress-bar';

import superagent from 'superagent';

class UploadView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      genre: '',
      rating: '',
      searchResults: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validateDrop = this.validateDrop.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.parseResults = this.parseResults.bind(this);
    this.handleAutoComplete = this.handleAutoComplete.bind(this);
    this.test = this.test.bind(this);
  }

  test(event) {
    event.preventDefault();

    const { type, name, value, files } = event.target;

    let postURL = null;
    return superagent.get(`${__API_URL__}/presignedURL`)
      .then(response => {
        console.log(response);
        return response.body;
      })
      .then(postURL => {
        console.log(postURL);
        return superagent.put(postURL)
          .set('Content-Type', 'application/octet-stream')
          .send(this.state.movie)
          .on('progress', e => console.log(e.percent))
          .then(console.log)
          .catch(console.log);
      })
      .catch(console.log);
  }

  parseResults(searchResults) {
    console.log(searchResults);
    const posterURL = 'https://image.tmdb.org/t/p/w92';
    return searchResults.map((result, i) => {
      return {
        id: i,
        label: result.original_title,
        posterPath: `${posterURL}/${result.poster_path}`,
        rating: result.popularity,
        releaseDate: result.release_date,
      };
    });
  }

  handleChange(event) {
    console.log(event.target);
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

  handleAutoComplete(event) {
    this.setState({ title: event.target.value }, () => {
      return SEARCH_BY_TITLE(this.state.title)
        .then(this.parseResults)
        .then(searchResults => this.setState({ searchResults }));
    });
  }

  validateDrop(files) {
    if (files.length === 1 && files[0] instanceof File) {
      return files;
    }
  }

  handleDrop(files) {
    const validatedFiles = this.validateDrop(files);

    this.setState({
      movie: validatedFiles[0],
    });
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

    const renderItem = (item, highlighted) =>
      <div key={item.id} className='autocomplete-item'>
        <img src={item.posterPath} className='autocomplete-image'/>
        {item.label}
      </div>;

    const renderInput = props =>
      <input
        {...props}
        className='populated-field'
        placeholder='title'
      />;

    return (
      <div className='upload-view'>
        <h1>Upload</h1>
        <DropZone handleDrop={this.handleDrop}/>
        <ProgressBar />
        <form className='movie-form' onSubmit={this.test}>
          <Autocomplete
            value={this.state.title}
            onChange={this.handleAutoComplete}
            items={this.state.searchResults}
            getItemValue={item => item.label}
            renderItem={ renderItem }
            renderInput={ renderInput }
            menuStyle={ menuStyling }
            onSelect={value => {
              return this.setState({ title: value });
            }}
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
            title=' '
          />
          <br />
          <button type='submit'>Upload Movie</button>
        </form>
      </div>
    );
  }
}

// <button type='button' onClick={this.test}>FETCH URL</button>

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
