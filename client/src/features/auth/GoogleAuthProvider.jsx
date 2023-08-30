import { GoogleLogin } from '@react-oauth/google';

function GoogleOAuthProvider() {
  const responseMessage = (response) => {
    console.log('succcess!');

    // response returns a JWT with user data to create an account
    // need to add an endpoint to consume it
    console.log(response);
  };
  const errorMessage = (error) => {
    console.log(error);
  };
  return (
    <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
  );
}
export default GoogleOAuthProvider;
