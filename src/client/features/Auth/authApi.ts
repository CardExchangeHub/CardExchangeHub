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
    const token = await axios.post('api/auth/register', {
      name,
      email,
      password,
    });
    return token.data;
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
    const token = await axios.post('api/auth/login', {
      email,
      password,
    });
    return token.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
};
