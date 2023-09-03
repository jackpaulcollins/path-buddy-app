import {
  useRef, useState, useEffect,
} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from './authSlice';
import { useRegisterMutation } from './authApiSlice';
import Dropdown from '../../components/Dropdown';
import systemTimeZones from '../../constants/timeZones';
import ErrorAlert from '../../components/ErrorAlert';
import GoogleAuthProvider from './GoogleAuthProvider';

function Login() {
  const emailRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const [timeZone, setTimeZone] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [email, firstName, lastName, password]);

  const clearformState = () => {
    setEmail('');
    setFirstName('');
    setLastName('');
    setPassword('');
    setPasswordConfirmation('');
  };

  const allRequiredFieldsPresent = () => {
    const missingFields = [];

    if (!timeZone) missingFields.push('Time Zone');
    if (!email) missingFields.push('Email');
    if (!firstName) missingFields.push('First Name');
    if (!lastName) missingFields.push('Last Name');
    if (!password) missingFields.push('Password');
    if (!passwordConfirmation) missingFields.push('Password Confirmation');

    if (missingFields.length > 0) {
      const missingFieldsString = missingFields.join(', ');
      setErrMsg(`Please fill in the following required fields: ${missingFieldsString}.`);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const readyForSubmit = !!allRequiredFieldsPresent();

    if (!readyForSubmit) {
      return;
    }

    try {
      const userInput = {
        email,
        first_name: firstName,
        last_name: lastName,
        time_zone: timeZone,
        password,
        password_confirmation: passwordConfirmation,
      };
      const response = await register({ user: userInput }).unwrap();
      const { user } = response.data;
      const { authorization } = response.headers;
      const token = authorization.replace('Bearer ', '');
      dispatch(setCredentials({ user, token }));
      clearformState();
      navigate('/');
    } catch (error) {
      if (error.status === 422) {
        setErrMsg(error.data.data.error);
      } else if (error.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
    }
  };

  const handleTimeZoneInput = (tz) => setTimeZone(tz);

  const handleEmailInput = (e) => setEmail(e.target.value);

  const handleFirstNameInput = (e) => setFirstName(e.target.value);

  const handleLastNameInput = (e) => setLastName(e.target.value);

  const handlePasswordInput = (e) => setPassword(e.target.value);

  const handlePasswordConfirmationInput = (e) => setPasswordConfirmation(e.target.value);

  const clearErrors = () => setErrMsg('');

  const content = (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign up for an account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="mb-8">
          {errMsg ? <ErrorAlert clearErrors={clearErrors} messages={[errMsg]} /> : null}
        </div>
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="mt-2">
                <label htmlFor="email">
                  <p className="block text-sm font-medium leading-6 text-gray-900">Email</p>
                  <input
                    type="email"
                    id="email"
                    ref={emailRef}
                    value={email}
                    onChange={handleEmailInput}
                    autoComplete="on"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                </label>
              </div>
            </div>

            <div>
              <div className="mt-2">
                <label htmlFor="firstName">
                  <p className="block text-sm font-medium leading-6 text-gray-900">First name</p>
                  <input
                    type="text"
                    id="firstName"
                    ref={firstNameRef}
                    value={firstName}
                    onChange={handleFirstNameInput}
                    autoComplete="off"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                </label>
              </div>
            </div>

            <div>
              <div>
                <label htmlFor="lastName">
                  <p className="block text-sm font-medium leading-6 text-gray-900">Last name</p>
                  <input
                    type="text"
                    id="lastName"
                    ref={lastNameRef}
                    value={lastName}
                    onChange={handleLastNameInput}
                    autoComplete="off"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                </label>
              </div>
            </div>
            <div>
              <label htmlFor="password">
                <p className="block text-sm font-medium leading-6 text-gray-900">Password</p>
                <input
                  type="password"
                  id="password"
                  onChange={handlePasswordInput}
                  value={password}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </label>
            </div>

            <div>
              <label htmlFor="passwordConfirmation">
                <p className="block text-sm font-medium leading-6 text-gray-900">Password confirmation</p>
                <input
                  type="password"
                  id="passwordConfirmation"
                  onChange={handlePasswordConfirmationInput}
                  value={passwordConfirmation}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </label>
            </div>

            <div>
              <Dropdown
                selectorFunc={handleTimeZoneInput}
                currentSelection={timeZone}
                dropdownOptions={systemTimeZones}
                placeHolder="Time Zone"
              />
            </div>

            <div className="flex items-center justify-between">

              <div className="text-sm leading-6">
                <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Already have an account?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <div>
            <div className="relative mt-10">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm font-medium leading-6">
                <span className="bg-white px-6 text-gray-900">Or continue with</span>
              </div>
            </div>

            <div className="w-1/2 mt-6 m-auto">
              <GoogleAuthProvider />
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?
          {' '}
          <Link to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Start a 14 day free trial
          </Link>
        </p>
      </div>
    </div>
  );

  return content;
}
export default Login;
