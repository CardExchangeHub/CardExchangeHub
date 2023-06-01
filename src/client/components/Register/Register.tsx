import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { registerUser, selectAuth } from '../../features/Auth/authSlice';

const Register = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);

  const [user, setUser] = useState({ name: '', email: '', password: '' });

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registerUser(user));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input
        name="name"
        onChange={(e) => handleChange(e)}
        type="text"
        placeholder="name"
        value={user.name}
      />
      <input
        value={user.email}
        name="email"
        onChange={(e) => handleChange(e)}
        type="email"
        placeholder="email"
      />
      <input
        value={user.password}
        name="password"
        onChange={(e) => handleChange(e)}
        type="password"
        placeholder="password"
      />
      <button>
        {auth.registerStatus === 'pending' ? 'Submitting' : 'Register'}
      </button>
      {auth.registerStatus === 'failed' && <p>{auth.registerError}</p>}
    </form>
  );
};

export default Register;
