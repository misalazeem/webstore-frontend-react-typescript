import { FormEvent, useState } from 'react';
import { validateEmail, validatePassword } from '../../utils/RegisterFunctiosn';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/Auth/AuthActions';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../redux/store';

export interface RegisterFormProps {
  username: string;
  email: string;
  password: string;
}

const RegisterForm: RegisterFormProps = {
  username: '',
  email: '',
  password: ''
};

const Register = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [registerForm, setRegisterForm] = useState(RegisterForm);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let updatedValue = value;

    if (name === 'username') {
      updatedValue = value.replace(/[!@#$%^&*/(),-?":{}|<>]/g, '');
    }

    setRegisterForm({ ...registerForm, [name]: updatedValue });
    setErrorMessage(null);
  };

  const validateForm = () => {
    if (!registerForm.username || !registerForm.email || !registerForm.password) {
      setErrorMessage('All fields are required.');
      return false;
    }

    if (!validateEmail(registerForm.email)) {
      setErrorMessage('Please enter a valid email address.');
      return false;
    }

    if (!validatePassword(registerForm.password).isValid) {
      setErrorMessage('Please enter a valid password.');
      return false;
    }

    if (registerForm.username.length < 9 || registerForm.password.length < 5) {
      setErrorMessage('Username, password and Name must have a minimum of 5 characters.');
      return false;
    }

    return true;
  };

  const submitForm = async (event: FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      if (validateForm()) {
        try {
          await dispatch(registerUser({ formData: registerForm }));
          setErrorMessage(null);
          setSuccessMessage('Registration successful!');
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        } catch (error) {
          setErrorMessage('Registration failed. Please try again.');
        }
      }
    }
  };

  const passwordValidation = validatePassword(registerForm.password);

  return (
    <>
      <div className="flex justify-center items-center mt-4">
        <form
          className="w-full bg-[#f4f4f4] h-[80vh] flex flex-col gap-8 items-center justify-center p-4 rounded shadow-md md-w-[70%] lg:w-[50%]"
          onSubmit={submitForm}
        >
          <h2 className="text-xl font-bold">Register</h2>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              name="email"
              className="grow"
              value={registerForm.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              name="username"
              className="grow"
              onChange={handleChange}
              value={registerForm.username}
              placeholder="Username"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              name="password"
              className="grow"
              onChange={handleChange}
              value={registerForm.password}
              placeholder="Password"
            />
          </label>
          {registerForm.password && (
            <div className="flex flex-col items-center gap-2">
              <div className="flex flex-row gap-2 justify-between">
                {passwordValidation.hasMinimumLength ? (
                  <>
                    <span className="text-green-500">&#10003;</span>
                    <p className="text-green-500">Password must have at least 8 characters</p>
                  </>
                ) : (
                  <>
                    <span className="text-red-500">&#10007;</span>
                    <p className="text-red-500">Password must have at least 8 characters</p>
                  </>
                )}
              </div>
              <div className="flex flex-row gap-2 justify-between">
                {passwordValidation.hasUpperCase ? (
                  <>
                    <span className="text-green-500">&#10003;</span>
                    <p className="text-green-500">Password must have an uppercase character</p>
                  </>
                ) : (
                  <>
                    <span className="text-red-500">&#10007;</span>
                    <p className="text-red-500">Password must have an uppercase character</p>
                  </>
                )}
              </div>
              <div className="flex flex-row gap-2 justify-between">
                {passwordValidation.hasSpecialCharacter ? (
                  <>
                    <span className="text-green-500">&#10003;</span>
                    <p className="text-green-500">Password must have a special characterr</p>
                  </>
                ) : (
                  <>
                    <span className="text-red-500">&#10007;</span>
                    <p className="text-red-500">Password must have a special characterr</p>
                  </>
                )}
              </div>
            </div>
          )}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <button type="submit" className="btn btn-outline btn-accent">
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
