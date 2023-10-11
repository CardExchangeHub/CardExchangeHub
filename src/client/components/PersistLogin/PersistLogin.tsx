import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectAuth, verifyLogin } from '../../features/Auth/authSlice';

const PersistLogin = () => {
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      console.log(auth._id);
      if (!auth._id) {
        await dispatch(verifyLogin(null));
      }
      setIsLoading(false);
    };

    verifyUser();
  }, []);

  return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistLogin;
