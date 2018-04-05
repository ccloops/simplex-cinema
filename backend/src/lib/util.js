'use strict';

import AWS from 'aws-sdk';
import fs from 'fs-extra';
import superagent from 'superagent';

const s3 = new AWS.S3();

export const removeMulterFile = data => fs.remove(data.path);
export const removeMulterFiles = list => Promise.all(list.map(removeMulterFile));

export const s3UploadFile = data => {
  console.log('S3 UPLOAD ====>', data[0]);

  const movieUpload = () => {
    return s3.upload({
      ACL: 'public-read',
      Bucket: process.env.AWS_BUCKET,
      Key: `${data[0].filename}.${data[0].originalname}`,
      Body: fs.createReadStream(data[0].path),
    }).promise()
      .catch(err => { throw err; });
  };

  const posterUpload = () =>  {
    return s3.upload({
      ACL: 'public-read',
      Bucket: process.env.AWS_BUCKET,
      Key: `${data[1].filename}.${data[1].originalname}`,
      Body: fs.createReadStream(data[1].path),
    }).promise()
      .catch(err => { throw err; });
  };

  return Promise.all([movieUpload(), posterUpload()])
    .then(s3Data => removeMulterFiles(data).then(() => s3Data))
    .catch(err => removeMulterFiles(data).then(() => { throw err; }));
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

export const getPresignedPost = request => {
  console.log('BODY ===>', request.body);
  let { key, posterURL, genre, title, rating } = request.body;
  const { _id, name, account } = request.body.body;

  return new Promise((resolve, reject) => {
    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: key,
      Expires: 3600,
      ContentType: 'application/octet-stream',
      Metadata: {
        _id,
        name,
        account,
        posterURL,
        genre,
        title,
        rating: rating.toString(),
      },
    };

    s3.getSignedUrl('putObject', params, (error, url) => {
      if (error) {
        reject(error);
      } else {
        resolve(url);
      }
    });
  });
};

export const s3UploadPoster = request => {
  const { poster, key } = request.body;


  return superagent.get(poster)
    .then(response => {
      const params = {
        ACL: 'public-read',
        Bucket: process.env.AWS_POSTER_BUCKET,
        Key: key,
        Body: response.body,
      };


      return new Promise((resolve, reject) => {
        s3.putObject(params, (error) => {
          if (error) {
            reject(error);
          } else {
            const url = `https://s3-us-west-2.amazonaws.com/simplex-cinema/${key}`;
            resolve(url);
          }
        });
      });

    })
    .catch(console.log);
};
