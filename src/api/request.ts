import axios from 'axios';

import { api } from '../common/constants';
import { IAuthResponse } from '../common/interfaces/IAuthResponse';
import setTokens from '../utils/setTokens';

const instance = axios.create({
  baseURL: api.baseURL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

const refreshAuthToken = async (): Promise<void> => {
  const { token, refreshToken }: IAuthResponse = await instance.post('/refresh', {
    refreshToken: localStorage.getItem('refreshToken'),
  });
  setTokens(token, refreshToken);
  instance.defaults.headers.Authorization = `Bearer ${token}`;
};

instance.interceptors.response.use(undefined, (error) => {
  if (!(error.response.data.status === 401)) {
    setTimeout(() => {
      refreshAuthToken().catch(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/';
      });
    }, 0);
  } else if (localStorage.getItem('token') === null) {
    window.location.href = '/sign-in';
  }
});

instance.interceptors.response.use((res) => res.data);

export default instance;
