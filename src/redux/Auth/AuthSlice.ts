import { createSlice } from '@reduxjs/toolkit';
import { checkLoggedUser, loginUser, registerUser } from './AuthActions';

const initialState = {
  loading: false,
  userInfo: {},
  error: null,
  loggedIn: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        const newState = { ...state };
        newState.loading = true;
        newState.error = null;
        return newState;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        const newState = { ...state };
        newState.loading = false;
        newState.userInfo = payload.data;
        return newState;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        const newState = { ...state };
        newState.loading = false;
        newState.error = (payload as { data: null }).data;
        return newState;
      })
      .addCase(loginUser.pending, (state) => {
        const newState = { ...state };
        newState.loading = true;
        newState.error = null;
        return newState;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const newState = { ...state };
        newState.loading = false;
        newState.userInfo = payload.data;
        newState.loggedIn = true;
        return newState;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        const newState = { ...state };
        newState.loading = false;
        newState.error = (payload as { data: null }).data;
        return newState;
      })
      .addCase(checkLoggedUser.fulfilled, (state, { payload }) => {
        state.loggedIn = payload;
      });
  }
});

export default authSlice.reducer;
