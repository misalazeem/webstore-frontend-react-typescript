import { RegisterFormProps } from "../../pages/Auth/Register";

export interface RegistratioResponse {
  data: {
    _id: string,
    username: string,
    email: string,
  }
}

export interface RegisterForm {
  formData: RegisterFormProps;
}

export interface LoginFormRespose {
  data: {
    access_token: string,
    user: {
      _id: string,
      username: string,
      email: string,
    }
  }
}

export interface LoginFormProps {
  email: string,
  password: string,
}

export interface LoginForm {
  formData: LoginFormProps,
}