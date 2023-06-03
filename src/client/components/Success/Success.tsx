import React, { useState, useEffect } from 'react';

interface User {
  username: string;
  email: string;
}

function Success() {
  const [users, setUsers] = useState<User[]>([]);
  const [isAuth, updateIsAuth] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch('/oauth/protected', {
          method: 'GET',
          credentials: 'include',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
          },
        });

        const resObject = await response.json();
        console.log(resObject);
        console.log(resObject.user);
        setUsers(resObject.user);
        updateIsAuth(true);
        console.log(isAuth);
      } catch (err) {
        console.log(`Error: ${err}`);
      }
    };

    getUser();
    console.log(users);
  }, []);

  return (
    <div className="vendorCard">
      <h2>Google Login</h2>
      <span>Welcome, {users.length > 0 ? users[0].username : ''}!</span>
      <br />
      <span>Email: {users.length > 0 ? users[0].email : ''}</span>
    </div>
  );
}

export default Success;
