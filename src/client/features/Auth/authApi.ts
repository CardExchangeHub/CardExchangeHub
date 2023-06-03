import axios, { AxiosRequestConfig } from 'axios';
import { User } from './authSlice';

interface RegisterUserParams {
  name: string;
  email: string;
  password: string;
}

interface LoginUserParams {
  email: string;
  password: string;
}

export const postRegisterUser = async (
  newUser: RegisterUserParams,
  { rejectWithValue }
) => {
  const { name, email, password } = newUser;
  try {
    const response = await axios.post(
      '/auth/register',
      {
        name,
        email,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
};

export const postLoginUser = async (
  newUser: LoginUserParams,
  { rejectWithValue }
) => {
  const { email, password } = newUser;
  try {
    const response = await axios.post(
      '/auth/login',
      {
        email,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    if (error.response.status === 400) {
      return rejectWithValue('Missing Username or Password');
    } else if (error.response.status === 401) {
      return rejectWithValue('Invalid Username or Password');
    } else {
      return rejectWithValue('Login failed');
    }
  }
};

export const getVerifyLogin = async (param: null, { rejectWithValue }) => {
  try {
    // const response = await axios.get('/auth/verify');
    const response = await axios.get('/oauth/protected', {
      withCredentials: true,
      headers: {
        Accept: 'application/json',
          'Content-Type': 'application/json',
      },
    });
    console.log(response.data.user)
    return response.data.user;
  } catch (error) {
    rejectWithValue('User not loggged in');
  }
};