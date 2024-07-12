/* eslint-disable no-param-reassign */
import axios from 'axios';

import { api } from '../common/constants';
import { IAuthResponse } from '../common/interfaces/IAuthResponse';

const instance = axios.create({
  baseURL: api.baseURL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

const refreshAuthToken = async (): Promise<string> => {
  const refreshToken = localStorage.getItem('refreshToken');
  const response: IAuthResponse = await instance.post('/refresh', {
    refreshToken,
  });
  localStorage.setItem('token', response.token);
  localStorage.setItem('refreshToken', response.refreshToken);

  return response.token;
};

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error;
    const originalRequest = error.config;

    if (response?.status === 401 && !originalRequest.isRetry) {
      originalRequest.isRetry = true;

      try {
        const newToken = refreshAuthToken();
        instance.defaults.headers.Authorization = `Bearer ${newToken}`;
        originalRequest.headers.Authorization = `Bearer ${newToken}`; // `Authorization` should be used here

        return await axios(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.setItem('redirectUrl', window.location.pathname);
        window.location.href = '/auth/sign-in';

        return Promise.reject(refreshError);
      }
    }

    if (response?.status === 404) {
      window.location.href = '/error';
    }

    return Promise.reject(error);
  },
);

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
instance.interceptors.response.use((res) => res.data);

export default instance;
