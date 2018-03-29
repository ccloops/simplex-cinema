import './_upload-view.scss';
import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete';
import { connect } from 'react-redux';

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
      poster: '',
      movie: '',
      searchResults: [],
      foundMovie: {},
      hasUploaded: false,
      hasFoundTitle: false,
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

    return superagent.get(`${__API_URL__}/profiles/me`)
      .set('Authorization', `Bearer ${this.props.token}`)
      .then(profile => {
        let data = profile;
        data.key = 'testing123';
        return superagent.post(`${__API_URL__}/presignedURL`)
          .set('Authorization', `Bearer ${this.props.token}`)
          .send(data);
      })
      .then(console.log);
    // return superagent.get(`${__API_URL__}/presignedURL`)
    //   .then(response => {
    //     return response.body;
    //   })
    //   .then()
    //   .then(postURL => {
    //     return superagent.put(postURL)
    //       .set('Content-Type', 'application/octet-stream')
    //       .send(this.state.movie)
    //       .on('progress', e => console.log(e.percent));
    //   });
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  handleAutoComplete(event) {
    this.setState({ title: event.target.value }, () => {
      return SEARCH_BY_TITLE(this.state.title)
        .then(this.parseResults)
        .then(searchResults => this.setState({ searchResults }));
    });
  }

  parseResults(searchResults) {
    console.log(searchResults);
    const posterURL = 'https://image.tmdb.org/t/p/w92';
    return searchResults.map((result, i) => {
      return {
        id: result.id,
        label: result.original_title,
        posterPath: `${posterURL}/${result.poster_path}`,
        rating: result.popularity,
        releaseDate: result.release_date,
      };
    });
  }

  handleDrop(files) {
    const validatedFile = this.validateDrop(files);
    console.log(validatedFile);

    this.setState({
      movie: validatedFile[0],
      hasUploaded: true,
    });
  }

  validateDrop(file) {
    if (file.length === 1) {
      return file;
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

  populateValues() {
    return superagent.get;
  }

  render() {

    const showTitle = this.state.hasUploaded ? 'populated-field' : 'hidden';
    const showInfo = this.state.hasFoundTitle ? 'populated-field' : 'hidden';

    const renderItem = (item, highlighted) =>
      <div>
        <div
          key={item.id}
          className='autocomplete-item'
          onClick={() => this.setState({ foundMovie: item })}
        >
          <img src={item.posterPath} className='autocomplete-image'/>
          {item.label}
        </div>;
      </div>;

    const renderInput = props =>
      <input
        {...props}
        className={ showTitle }
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
              console.log(value);
              this.populateValues();
              return this.setState({ title: value, hasFoundTitle: true });
            }}
          />
          <input
            type='text'
            name='genre'
            value={this.state.genre}
            placeholder='genre'
            onChange={this.handleChange}
            className={ showInfo }
          />
          <input
            type='text'
            name='rating'
            value={this.state.rating}
            placeholder='rating'
            onChange={this.handleChange}
            className={ showInfo }
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

const mapStateToProps = state => ({
  token: state.token,
});

export default connect(mapStateToProps)(UploadView);
