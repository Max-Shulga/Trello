import { createSlice } from '@reduxjs/toolkit';

import UserRoles from '../../../common/types/UserRoles';
import setTokens from '../../../utils/setTokens';
import { userSignIn } from '../actions';

interface IInitialState {
  email: string
  role: UserRoles
}
const initialState: IInitialState = {
  email: '',
  role: localStorage.getItem('token')
    ? UserRoles.AUTHORIZED
    : UserRoles.NOT_AUTHORIZED,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserRole: (state, { payload }) => ({
      ...state,
      role: payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(userSignIn.fulfilled, (state, { payload }) => {
      setTokens(payload.token, payload.refreshToken);

      return {
        ...state,
        role: localStorage.getItem('token') ? UserRoles.AUTHORIZED : UserRoles.NOT_AUTHORIZED,
      };
    });
  },
});
export const { setUserRole } = userSlice.actions;
export default userSlice.reducer;
