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

const refreshAuthToken = async (): Promise<void> => {
  setTimeout(() => {
    window.location.href = '/';
  }, 2000);
  const refreshToken = localStorage.getItem('refreshToken');
  const response: IAuthResponse = await instance.post('/refresh', {
    refreshToken,
  });
  localStorage.setItem('token', response.token);
  localStorage.setItem('refreshToken', response.refreshToken);
  instance.defaults.headers.Authorization = `Bearer ${response.token}`;
};

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      if (localStorage.getItem('refreshToken')) {
        try {
          await refreshAuthToken();

          return await instance(error.config);
        } catch {
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          window.location.href = '/auth/sign-in';
        }
      } else {
        window.location.href = '/auth/sign-in';
      }
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
