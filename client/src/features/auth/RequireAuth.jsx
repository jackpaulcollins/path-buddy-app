import { useState, useEffect } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from './authSlice';
import { useVerifyTokenMutation } from './authApiSlice';
import FullScreenLoading from '../../components/FullScreenLoading';

function RequireAuth() {
  const [authenticated, setAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const [verifyToken] = useVerifyTokenMutation();
  const token = useSelector(selectCurrentToken);

  useEffect(() => {
    const authenticateToken = async () => {
      const response = await verifyToken({ token }).unwrap();
      const { verified } = response.data;
      setIsLoading(false);
      setAuthenticated(verified);
    };

    // if there's a token, verify it and let the func determine
    // whether or not we proceed
    // if there's no token then simply redirect to public page

    if (token) {
      authenticateToken()
        .catch(console.error);
    } else {
      setIsLoading(false);
      setAuthenticated(false);
    }
  }, []);

  if (isLoading === true) {
    return <FullScreenLoading />;
  }

  return (
    authenticated && !isLoading
      ? <Outlet />
      : <Navigate to="/public" state={{ from: location }} replace />
  );
}
export default RequireAuth;
