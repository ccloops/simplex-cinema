import superagent from 'superagent';
import * as routes from '../routes';

// Synchronous
export const setTokenAction = token => ({
  type: 'TOKEN_SET',
  payload: token,
});

export const removeTokenAction = () => ({
  type: 'TOKEN_REMOVE',
});

// Asynchronous
export const signupAction = account => store => {
  return superagent.post(`${process.env.API_URL}${routes.SIGNUP_ROUTE}`)
    .send(account)
    .withCredentials()
    .then(response => {
      console.log({ response });
      return store.dispatch(setTokenAction(response.text));
    });
};

export const loginAction = account => store => {
  return superagent.get(`${process.env.API_URL}${routes.LOGIN_ROUTE}`)
    .auth(account.username, account.password)
    .withCredentials()
    .then(response => {
      console.log({ response });
      return store.dispatch(setTokenAction(response.text));
    });
};
