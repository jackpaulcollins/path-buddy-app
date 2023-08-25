import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setCredentials } from './authSlice';
import { useRegisterMutation } from './authApiSlice';

const Login = () => {
  const emailRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const errRef = useRef();
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userInput = {
        email, first_name: firstName, last_name: lastName, password, password_confirmation: passwordConfirmation,
      };
      const response = await register({ user: userInput }).unwrap();
      const { user } = response.data.data;
      const { authorization } = response.headers;

      console.log(user, authorization);
      dispatch(setCredentials({ user, authorization }));
      setEmail('');
      setFirstName('');
      setLastName('');
      setPassword('');
      setPasswordConfirmation('');
      navigate('/welcome');
    } catch (err) {
      if (!err?.originalStatus) {
        // isLoading: true until timeout occurs
        setErrMsg('No Server Response');
      } else if (err.originalStatus === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.originalStatus === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
  };

  const handleEmailInput = (e) => setEmail(e.target.value);

  const handleFirstNameInput = (e) => setFirstName(e.target.value);

  const handleLastNameInput = (e) => setLastName(e.target.value);

  const handlePasswordInput = (e) => setPassword(e.target.value);

  const handlePasswordConfirmationInput = (e) => setPasswordConfirmation(e.target.value);

  const content = isLoading ? <h1>Loading...</h1> : (
    <section className="login">
      <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">{errMsg}</p>

      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">email:</label>
        <input
          type="text"
          id="email"
          ref={emailRef}
          value={email}
          onChange={handleEmailInput}
          autoComplete="off"
          required
        />

        <label htmlFor="firstName">first name:</label>
        <input
          type="text"
          id="firstName"
          ref={firstNameRef}
          value={firstName}
          onChange={handleFirstNameInput}
          autoComplete="off"
          required
        />

        <label htmlFor="lastName">last name:</label>
        <input
          type="text"
          id="lastName"
          ref={lastNameRef}
          value={lastName}
          onChange={handleLastNameInput}
          autoComplete="off"
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={handlePasswordInput}
          value={password}
          required
        />

        <label htmlFor="passwordConfirmation">Password Confirmaion:</label>
        <input
          type="password"
          id="password"
          onChange={handlePasswordConfirmationInput}
          value={passwordConfirmation}
          required
        />
        <button>Sign Up</button>
      </form>
    </section>
  );

  return content;
};
export default Login;
