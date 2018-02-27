'use strict';

import AWS from 'aws-sdk';
import fs from 'fs-extra';

const s3 = new AWS.S3();

export const removeMulterFile = data => fs.remove(data.path);
export const removeMulterFiles = list => Promise.all(list.map(removeMulterFile));

export const s3UploadFile = data => {
  return s3.upload({
    ACL: 'public-read',
    Bucket: process.env.AWS_BUCKET,
    Key: `${data.filename}.${data.originalname}`,
    Body: data.posterBlob,
  }).promise()
    .catch(err => { throw err; });
};

export const promisify = fn => {
  return (...args) => {
    return new Promise((resolve, reject) => {
      fn(...args, (error, data) => {
        if (error) {
          return reject(error);
        }
        return resolve(data);
      });
    });
  };
};

export const pagerCreate = (model, populate = '') => (req, query = {}) => {
  let offset = (Number(req.query.page) - 1) || 0;
  let itemLimit = 100;
  let route = `${process.env.API_URL}/${model.modelName}s?page=`;
  return model.count()
    .then(count => {
      let remaining = count - offset * itemLimit;
      return model.find(query)
        .populate(populate)
        .skip(offset > 0 ? offset * itemLimit : 0)
        .limit(itemLimit)
        .then(profiles => ({
          count: count,
          data: profiles,
          last: `${route}${Math.floor((count - 1) / itemLimit) + 1}`,
          prev: offset > 0 && remaining > 0  ? `${route}${offset}` : null,
          next: offset > -1 && remaining > itemLimit ? `${route}${offset + 2}` : null,
        }));
    });
};
