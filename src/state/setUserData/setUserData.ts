import Cookie from 'js-cookie';

export interface DataType {
  access_token: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

export const setUserState = (data: DataType) => {
  Cookie.set('access_token', data.access_token, { expires: 1 });
  Cookie.set('username', data.user.username, { expires: 1 });
  Cookie.set('id', data.user.id, { expires: 1 });
  Cookie.set('email', data.user.email, { expires: 1 });
};
