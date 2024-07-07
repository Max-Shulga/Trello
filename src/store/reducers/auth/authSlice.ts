/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { signIn } from '../actions';

interface AuthState {
  isLoggedIn: boolean;
  isLoading: boolean;
  error: number | undefined;
}
const initialState: AuthState = {
  isLoggedIn: false,
  isLoading: false,
  error: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.fulfilled, (state) => ({
        ...state,
        isLoggedIn: true,
      }
      ))
      .addCase(signIn.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export default authSlice.reducer;
