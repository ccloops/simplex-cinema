'use strict';

import { Router } from 'express';
import Movie from '../model/movie';
import { bearerAuth } from '../middleware/auth-middleware';

export default new Router()
  .post('/movies', bearerAuth, (request, response, next) => {
    return Movie.create(request)
      .then(response.json)
      .catch(next);
  });
