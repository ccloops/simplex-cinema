'use strict';

import { Router } from 'express';
import Account from '../model/account';
import Profile from '../model/profile';
import { basicAuth } from '../middleware/auth-middleware';
import parserBody from '../middleware/parser-body';

let tempAccount = null;

export default new Router()
  .post('/signup', parserBody, (request, response, next) => {
    return Account.create(request.body)
      .then(account => {
        tempAccount = account;
        return account.createToken();
      })
      .then(token => {
        response.send(token);
      })
      .then(() => new Profile({ name: tempAccount.username, account: tempAccount._id })
        .save()
      )
      .catch(next);
  })
  .get('/login', basicAuth, (request, response, next) => {
    return request.account.createToken()
      .then(token => {
        response.send(token);
      })
      .catch(next);
  });
