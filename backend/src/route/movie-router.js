'use strict';

import { Router } from 'express';
import Movie from '../model/movie';
import { bearerAuth } from '../middleware/auth-middleware';
import parserBody from '../middleware/parser-body';

import { getPresignedPost } from '../lib/util';

export default new Router()
  .post('/movies', bearerAuth, parserBody, (request, response, next) => {
    return Movie.create(request)
      .then(response.json)
      .catch(next);
  })
  .post('/poster', bearerAuth, parserBody, (request, response, next) => {
    return Movie.createPoster(request)
      .then(url => response.json(url))
      .catch(next);
  })
  .post('/presignedURL', bearerAuth, parserBody, (request, response, next) => {
    return getPresignedPost(request)
      .then(response.json)
      .catch(next);
  })
  .get('/movies', (request, response, next) => {
    return Movie.fetch(request)
      .then(response.page)
      .catch(next);
  })
  .get('/movies/:id', (request, response, next) => {
    return Movie.fetchOne(request)
      .then(response.json)
      .catch(next);
  });
