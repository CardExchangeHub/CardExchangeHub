import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <Link to="login">
      <button>Log In</button>
    </Link>
  );
};

export default NavBar;
