import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectAuth, verifyLogin } from '../../features/Auth/authSlice';

const PersistLogin = () => {
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  // will want to dispatch loading to true - this will be for dashboard or checkout - will create a reducer for this
  // for now using useState for quick implementation
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!auth._id) {
      dispatch(verifyLogin(null));
    } else {
      setIsLoading(false);
    }
  }, []);

  return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistLogin;
