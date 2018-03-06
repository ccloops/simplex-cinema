'use strict';

import mongoose, { Schema } from 'mongoose';
import httpError from 'http-errors';
import * as util from '../lib/util';

const movieSchema = new Schema({
  posterURL: {
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

const Movie = module.exports = mongoose.model('movie', movieSchema);

Movie.validateRequest = function(request) {
  if (request.method === 'POST' && !request.files) {
    return Promise.reject(httpError(400, '__VALIDATION_ERROR__: must have a file'));
  }

  if (request.method === 'POST' && request.files.length < 1) {
    return Promise.reject(httpError(400, '__VALIDATION_ERROR__: must have a file'));
  }

  if (request.files.length > 2) {
    return Promise.reject(httpError(400, '__VALIDATION_ERROR__: must have no more than two files'));
  }

  const [ file ] = request.files;

  if (file) {
    if (file.fieldname !== 'movie') {
      return Promise.reject(httpError(400, '__VALIDATION_ERROR__: file must be on field movie'));
    }
  }

  return Promise.resolve(request.files);
};

Movie.create = function(request) {
  return Movie.validateRequest(request)
    .then(files => {
      return util.s3UploadFile(files)
        .then(s3Data => {
          console.log('does it make it here?', s3Data);
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
