import { path, pathOr } from 'ramda';
import Axios from 'axios';

const retrieveApiKey = () => path(['VUE_APP_POSTMAN_API_KEY'], process.env);

const generateHeaders = ({ apiKey }) => ({
  'x-api-key': apiKey,
});

export const getWorkspaces = () => {
  const apiKey = retrieveApiKey();

  const headers = generateHeaders({
    apiKey,
  });

  return Axios.get('https://api.getpostman.com/workspaces', { headers });
};

export const getWorkspaceEnvironments = (workspaceId) => {
  const apiKey = retrieveApiKey();

  const headers = generateHeaders({
    apiKey,
  });

  return Axios.get(`https://api.getpostman.com/workspaces/${workspaceId}`, { headers })
    .then(pathOr([], ['data', 'workspace', 'environments']));
};

export const getEnvironment = (environmentId) => {
  const apiKey = retrieveApiKey();

  const headers = generateHeaders({
    apiKey,
  });

  return Axios.get(`https://api.getpostman.com/environments/${environmentId}`, { headers })
    .then(pathOr([], ['data', 'environment']));
};
