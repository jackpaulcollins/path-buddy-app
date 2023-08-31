/* eslint-disable */

import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { useRegisterWithOauthMutation } from './authApiSlice';
import { setCredentials } from './authSlice';
import { useNavigate } from 'react-router-dom';

function GoogleOAuthProvider() {
  const [registerWithOauth] = useRegisterWithOauthMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signUpFromOauth = async (token) => {
    const response = await registerWithOauth({ provider: "google", token}).unwrap();
    const { user } = response.data
    const { authorization } = response.headers;
    const response_token = authorization.replace('Bearer ', '');
    dispatch(setCredentials({ user, token: response_token }));
    localStorage.setItem('PB-JWT-TOKEN', response_token);

    navigate('/');
  }

  const responseMessage = (response) => {
    const { credential } = response;

    signUpFromOauth(credential);
  };
  const errorMessage = (error) => {
    console.log(error);
  };
  return (
    <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
  );
}
export default GoogleOAuthProvider;
