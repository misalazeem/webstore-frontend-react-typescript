import Cookie from 'js-cookie';
import axios from 'axios';
import { API_URL } from '../../config/constants';

export const checkLoggedIn = async () => {
  const token = Cookie.get('access_token');

  if (!token) {
    return false;
  }

  const url = `${API_URL}/user/currentuser`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (!response.data) {
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error checking logged-in status:', error);
    Cookie.remove('access_token');
    Cookie.remove('id');
    Cookie.remove('username');
    Cookie.remove('email');
    return false;
  }
};
