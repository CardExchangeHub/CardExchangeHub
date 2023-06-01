import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { postRegisterUser, postLoginUser } from './authApi';
import jwtDecode from 'jwt-decode';

export interface AuthState {
  token: string;
  user: string;
  name: string;
  email: string;
  _id: string;
  registerStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
  registerError: null | string | undefined;
  loginStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
  loginError: null | string | undefined;
  userLoaded: boolean;
}

export interface User {
  name: string;
  email: string;
  _id: string;
}

const initialState: AuthState = {
  token: '',
  user: '',
  name: '',
  email: '',
  _id: '',
  registerStatus: 'idle',
  registerError: null,
  loginStatus: 'idle',
  loginError: null,
  userLoaded: false,
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  postRegisterUser
);

export const loginUser = createAsyncThunk('auth/loginUser', postLoginUser);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loadUser: (state) => {
      const token = state.token;

      if (token) {
        const user: User = jwtDecode(token);
        const { name, email, _id } = user;

        state.token = token;
        state.name = name;
        state.email = email;
        state._id = _id;
        state.userLoaded = true;
      }
    },
    logoutUser: (state) => {
      state.token = '';
      state.user = '';
      state.name = '';
      state.email = '';
      state._id = '';
      state.registerStatus = 'idle';
      state.registerError = null;
      state.loginStatus = 'idle';
      state.loginError = null;
      state.userLoaded = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.registerStatus = 'pending';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        if (action.payload.token) {
          const user: User = jwtDecode(action.payload.token);
          const { name, email, _id } = user;
          state.registerStatus = 'succeeded';
          state.token = action.payload;
          state.name = name;
          state.email = email;
          state._id = _id;
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerStatus = 'failed';
        state.registerError = action.error.message;
      })
      .addCase(loginUser.pending, (state, action) => {
        console.log('loginUser pending');
        state.loginStatus = 'pending';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload.token) {
          const user: User = jwtDecode(action.payload.token);
          const { name, email, _id } = user;
          state.loginStatus = 'succeeded';
          state.token = action.payload;
          state.name = name;
          state.email = email;
          state._id = _id;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginStatus = 'failed';
        state.loginError = action.error.message;
      });
  },
});

export const selectAuth = (state: RootState) => state.auth;
export const { loadUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
