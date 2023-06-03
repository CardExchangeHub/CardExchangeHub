import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectAuth, loginUser } from '../../features/Auth/authSlice';
interface User {
  username: string;
  email: string;
  google_id: string; // Add the token property
  id: string;
}

function Success() {
  const dispatch = useAppDispatch();

  const [userGreet, setUserGreet] = useState<User | null>(null); // Changed to User | null
  const [isAuth, updateIsAuth] = useState(false);
  const auth = useAppSelector(selectAuth);
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/oauth/protected', {
          withCredentials: true,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        const resObject: User = response.data.user; // Added type annotation User
        console.log(resObject);
        console.log(resObject.email);
        setUserGreet(resObject); // Set the entire user object
        console.log(userGreet);
        // dispatch(loginUser(userInfo));
        setUserInfo({
          email: resObject.email,
          password: resObject.google_id,
        });
        // dispatch(loginUser(userInfo));
        // dispatch(loginUser{
        //   type: 'LOGIN_SUCCESS',
        //   payload: resObject.google_id,
        //   userName: resObject.username,
        //   email: resObject.email,
        //   _id: resObject.id,
        // });
      } catch (err) {
        console.log(`Error: ${err}`);
      }
    };
    fetchUserData();
  }, [dispatch]); // Empty dependency array, runs once during initial render

  if (userGreet === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading user data...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start h-screen mt-24">
      <h2 className="text-2xl font-bold mb-4">User Dashboard</h2>
      <span className="text-xl mb-2">Welcome, {userGreet.username}!</span>
      <span className="text-gray-600">Email: {userGreet.email}</span>
    </div>
  );
}

export default Success;
