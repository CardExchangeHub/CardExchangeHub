import React from 'react';
import { Route, useNavigate } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import Sellers from './components/Sellers';
import Cart from './components/Cart/Cart';
import NotFound from './components/NotFound/NotFound';
import LogIn from './components/LogIn/LogIn';
import LogOut from './components/LogOut/LogOut';
import NavBar from './global/NavBar/NavBar';
import './styles/main.css';
import Cookies from 'js-cookie';
import Register from './components/Register/Register';

const App = () => {
  // const ssidCookie = Cookies.get('ssid');
  // const [isLoggedIn, setIsLoggedIn] = useState(ssidCookie);
  // const loginStatus = (isLoggedIn: string) => {
  //   setIsLoggedIn(isLoggedIn);
  // };
  return (
    <main className="App">
      <NavBar />
      <Route path="/" element={<HomePage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/sellers" element={<Sellers />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/logout" element={<LogOut />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Register />} />
    </main>
  );
};

export default App;
