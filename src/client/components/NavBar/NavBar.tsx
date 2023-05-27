import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <Link to="login">
      <button>Log In</button>
    </Link>
  );
};

export default NavBar;
