import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  username: string;
  email: string;
}

function Success() {
  const [userGreet, setUserGreet] = useState<User | null>(null); // Changed to User | null
  const [isAuth, updateIsAuth] = useState(false);

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
        console.log(resObject.username);
        console.log(resObject.email);
        setUserGreet(resObject); // Set the entire user object
        console.log(userGreet);
        updateIsAuth(true);
      } catch (err) {
        console.log(`Error: ${err}`);
      }
    };
    fetchUserData();
  }, []); // Empty dependency array, runs once during initial render

  if (userGreet === null) {
    return <div>Loading user data...</div>;
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
