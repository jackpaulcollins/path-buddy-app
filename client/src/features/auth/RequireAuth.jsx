/* eslint-disable no-console */
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from './authSlice';

function RequireAuth() {
  const location = useLocation();

  const verifyToken = () => {
    const token = useSelector(selectCurrentToken);
    if (token) {
      // verify

      console.log('true');
      return true;
    }

    console.log('false');
    return false;
  };

  const authenticated = !!verifyToken();

  return (
    authenticated
      ? <Outlet />
      : <Navigate to="/public" state={{ from: location }} replace />
  );
}
export default RequireAuth;
