import { useState, useEffect } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentToken, logOut } from './authSlice';
import { useVerifyTokenMutation } from './authApiSlice';
import FullScreenLoading from '../../components/FullScreenLoading';

function RequireAuth() {
  const [authenticated, setAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const [verifyToken] = useVerifyTokenMutation();
  const token = useSelector(selectCurrentToken);
  const dispatch = useDispatch();

  useEffect(() => {
    const authenticateToken = async () => {
      const response = await verifyToken({ token }).unwrap();
      const { verified } = response.data;
      setIsLoading(false);
      setAuthenticated(verified);
    };

    if (token) {
      authenticateToken()
        .catch((error) => {
          const { verified } = error.data;
          dispatch(logOut());
          setIsLoading(false);
          setAuthenticated(verified);
        });
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
