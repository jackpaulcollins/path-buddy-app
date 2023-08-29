import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from './authSlice';

function RequireAuth() {
  const token = useSelector(selectCurrentToken);
  const location = useLocation();

  return (
    token
      ? <Outlet />
      : <Navigate to="/public" state={{ from: location }} replace />
  );
}
export default RequireAuth;
