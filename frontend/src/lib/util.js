import superagent from 'superagent';
import * as routes from '../routes';

import { videoExtensions } from './video-extensions';
import { imageExtensions } from './image-extensions';

export const getMovieById = id => {
  return superagent.get(`${__API_URL__}${routes.MOVIES_ROUTE}/${id}`);
};

export const getFileType = file => {
  const splitName = file.name.split('.');
  return splitName[splitName.length - 1];
};

export const isVideo = type => {
  const extensions = videoExtensions;
  const extensionSet = new Set(extensions);

  return extensionSet.has(type);
};

export const isImage = type => {
  const extensions = imageExtensions;
  const extensionSet = new Set(extensions);

  return extensionSet.has(type);
};
