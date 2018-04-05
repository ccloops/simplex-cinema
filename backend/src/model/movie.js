'use strict';

import mongoose, { Schema } from 'mongoose';
import httpError from 'http-errors';
import * as util from '../lib/util';

const movieSchema = new Schema({
  posterURL: {
    type: String,
  },
  movieURL: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  profile: {
    type: Schema.Types.ObjectId, ref: 'profile',
  },
  account: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

const Movie = mongoose.model('movie', movieSchema);

Movie.validateRequest = function(request) {
  if (request.method === 'POST' && !request.files) {
    return Promise.reject(httpError(400, '__VALIDATION_ERROR__: must have a file'));
  }

  if (request.method === 'POST' && request.files.length < 1) {
    return Promise.reject(httpError(400, '__VALIDATION_ERROR__: must have a file'));
  }

  if (request.files.length > 2) {
    const err = httpError(400, '__VALIDATION_ERROR__: must have no more than two files');
    return util.removeMulterFiles(request.files)
      .then(() => { throw err; });
  }

  const [ movie, poster ] = request.files;

  if (movie.fieldname !== 'movie') {
    const err = httpError(400, '__VALIDATION_ERROR__: file must be on field movie');
    return util.removeMulterFiles(request.files)
      .then(() => { throw err; });
  }

  if (!poster) {
    console.log('POSTER !!!', poster);
  }

  return Promise.resolve(request.files);
};

Movie.create = function(request) {
  return Movie.validateRequest(request)
    .then(files => {
      return util.s3UploadFile(files)
        .then(s3Data => {
          return new Movie({
            account: request.account._id,
            profile: request.account.profile,
            movieURL: s3Data[0].Location,
            posterURL: s3Data[1].Location,
            title: request.body.title,
            genre: request.body.genre,
            rating: request.body.rating,
          }).save();
        });
    })
    .then(movie => {
      return Movie.findById(movie._id)
        .populate('profile');
    });
};

Movie.createFromLambda = function(request) {
  console.log('REQUEST ===>', request);
  return new Movie({
    account: request.account,
    profile: request._id,
    movieURL: request.movieURL,
    posterURL: request.posterurl,
    title: request.title,
    genre: request.genre,
    rating: request.rating,
  }).save();
};

Movie.createPoster = function(request) {
  return util.s3UploadPoster(request);
};

Movie.fetch = util.pagerCreate(Movie, '');

Movie.fetchOne = function(request) {
  return Movie.findById(request.params.id)
    .then(movie => {
      if (!movie) {
        throw httpError(404, '__NOT_FOUND__: movie not found');
      }
      return movie;
    });
};

export default Movie;
