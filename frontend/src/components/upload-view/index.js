import './_upload-view.scss';
import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete';
import { connect } from 'react-redux';

import { getFileType, isVideo, isImage, genreList } from '../../lib/util';
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
  }

  handleSubmit(event) {
    event.preventDefault();

    const { type, name, value, files } = event.target;

    // Get profile info for meta-data
    return superagent.post(`${__API_URL__}/poster`)
      .set('Authorization', `Bearer ${this.props.token}`)
      .set('Content-Type', 'application/json')
      .send({ poster: this.state.poster, key: this.state.title })
      .then(posterURL => {
        return superagent.get(`${__API_URL__}/profiles/me`)
          .set('Authorization', `Bearer ${this.props.token}`)
          .then(profile => {
            let data = profile;
            data.key = this.state.title;
            data.posterURL = posterURL.body;

            /* Post meta-data for postURL -- needed for eventual post
           * request to database from AWS Lambda */
            return superagent.post(`${__API_URL__}/presignedURL`)
              .set('Authorization', `Bearer ${this.props.token}`)
              .send(data)
              .then(response => response.body);
          });
      })
      .then(postURL => {
        // Post the movie to S3 via presignedURL
        return superagent.put(postURL)
          .set('Content-Type', 'application/octet-stream')
          .send(this.state.movie)
          .on('progress', e => console.log(e.percent));
      });
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
    const posterURL2 = 'https://image.tmdb.org/t/p/w300';

    this.setState({ poster: posterURL2 });

    return searchResults.map((result, i) => {
      return {
        id: result.id,
        label: result.original_title,
        posterThumb: `${posterURL}/${result.poster_path}`,
        poster: `${posterURL2}/${result.poster_path}`,
        rating: result.popularity,
        releaseDate: result.release_date,
        genres: result.genre_ids,
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

  populateValues() {
    const { genres, poster, rating } = this.state.foundMovie;

    const parsedGenres = genres
      .map(id => {
        return genreList.get(id.toString());
      });

    this.setState({
      poster,
      rating,
      genre: parsedGenres[0],
    });
  }

  render() {

    const showTitle = this.state.hasUploaded ? 'populated-field' : 'hidden';
    const showInfo = this.state.hasFoundTitle ? 'populated-field' : 'hidden';
    const showTitleLabel = this.state.hasUploaded ? '' : 'hidden';
    const showInfoLabel = this.state.hasFoundTitle ? '' : 'hidden';
    const dropzoneOrPoster = this.state.hasFoundTitle ?
      <img src={this.state.poster} /> : <DropZone handleDrop={this.handleDrop} />;

    const renderItem = (item, highlighted) =>
      <div>
        <div
          key={item.id}
          className='autocomplete-item'
          onClick={() => this.setState({ foundMovie: item })}
        >
          <img src={item.posterThumb} className='autocomplete-image'/>
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
        { dropzoneOrPoster }
        <ProgressBar />
        <form className='movie-form' onSubmit={this.handleSubmit}>
          <label className={ showTitleLabel }>Title</label>
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
          <label className={ showInfoLabel }>Genre</label>
          <input
            type='text'
            name='genre'
            value={this.state.genre}
            placeholder='genre'
            onChange={this.handleChange}
            className={ showInfo }
          />
          <label className={ showInfoLabel }>Rating</label>
          <input
            type='text'
            name='rating'
            value={this.state.rating}
            placeholder='rating'
            onChange={this.handleChange}
            className={ showInfo }
          />
          <br />
          <button className={ showInfo } type='submit'>Upload Movie</button>
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
