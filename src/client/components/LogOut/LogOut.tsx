import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LogOut: React.FC = () => {
  return (
    <div className="logout">
      <p>Logged out!</p>
      <Link to="/">
        <button type="button">Go to home page</button>
      </Link>
    </div>
  );
};

export default LogOut;
