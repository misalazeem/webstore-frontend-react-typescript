import Cookie from 'js-cookie';

export const useLogout = () => {
  Cookie.remove('access_token');
  Cookie.remove('id');
  Cookie.remove('username');
  Cookie.remove('email');
}