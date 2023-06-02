import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectAuth } from '../../features/Auth/authSlice';

const RequireAuth = () => {
  const auth = useAppSelector(selectAuth);
  const location = useLocation();

  return auth._id ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location, showLogin: true }} replace />
  );
};

export default RequireAuth;
