import multer from 'multer';
import bodyParser from 'body-parser';
import httpError from 'http-errors';

const upload = multer({ dest: `${__dirname}/../../temp`});

export default (request, response, next) => {
  const contentType = request.headers['content-type'];

  if (contentType.indexOf('application/json') > -1) {
    return bodyParser.json()(request, response, next);
  }

  if (contentType.indexOf('multipart/form-data') > -1) {
    return upload.any()(request, response, next);
  }

  next(httpError(400, `__VALIDATION_ERROR__: content-type not supported`));
};
