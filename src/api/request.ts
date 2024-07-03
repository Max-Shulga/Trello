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
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken) {
    window.location.href = '/sign-in';
  }

  const { token, refreshToken: newRefreshToken }: IAuthResponse = await instance.post('/refresh', {
    refreshToken,
  });
  instance.defaults.headers.Authorization = `Bearer ${newRefreshToken}`;
  setTokens(token, newRefreshToken);
  window.location.href = '/';
};
instance.interceptors.response.use(undefined, async (error) => {
  if (localStorage.getItem('refreshToken')) {
    if (error.response.status === 401) {
      await refreshAuthToken().catch(() => {
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('token');
        window.location.href = '/sign-in';
      });
    }
  }
});

instance.interceptors.response.use((res) => res.data);

export default instance;
