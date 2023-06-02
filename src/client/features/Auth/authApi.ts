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
      'api/auth/register',
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
      'api/auth/login',
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
    const response = await axios.get('api/auth/verify');
    return response.data;
  } catch (error) {
    rejectWithValue('User not loggged in');
  }
};
