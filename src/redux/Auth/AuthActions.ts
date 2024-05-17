import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { API_URL } from '../../config/constants';
import { RootState } from "../store";
import { LoginForm, LoginFormRespose, RegisterForm, RegistratioResponse } from "./types";
import { checkLoggedIn } from "../../state/checkLoggedIn/checkLoggedIn";

export const registerUser = createAsyncThunk<
  RegistratioResponse,
  RegisterForm,
  {
    state?: RootState;
  }
>(
  'register/user',
  async ({ formData }: RegisterForm) => {
    let url = `${API_URL}/user/register`;
    const response = await axios.post(url, formData);
    
    if (!response.data) {
        throw new Error('Network response is not correct');
    }
    return response.data;
  }
);

export const loginUser = createAsyncThunk<
  LoginFormRespose,
  LoginForm,
  {
    state?: RootState;
  }
>(
  'login/user',
  async({formData}: LoginForm) => {
    let url = `${API_URL}/user/login`;
    const response = await axios.post(url, formData);
    if(!response.data) {
      throw new Error('Network response is not correct');
    }    
    return response.data;
  }
)

export const checkLoggedUser = createAsyncThunk<boolean, void, { state: RootState }>(
  'auth/checkLoggedIn',
  async (_, { getState }) => {
    try {
      return await checkLoggedIn(); // Call the checkLoggedIn utility function
    } catch (error) {
      console.error('Error checking logged-in status:', error);
      return false;
    }
  }
);