'use strict';

import { Router } from 'express';
import Movie from '../model/movie';
import { bearerAuth } from '../middleware/auth-middleware';
import parserBody from '../middleware/parser-body';

export default new Router()
  .post('/movies', bearerAuth, parserBody, (request, response, next) => {
    return Movie.create(request)
      .then(response.json)
      .catch(next);
  })
  .get('/movies', (request, response, next) => {
    return Movie.fetch(request)
      .then(response.page)
      .catch(next);
  });
