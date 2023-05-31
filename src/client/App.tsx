import React from 'react';
import { Routes, Route, useNavigate, BrowserRouter } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import Sellers from './components/Sellers';
import Cart from './components/Cart/Cart';
import NotFound from './components/NotFound/NotFound';
import LogIn from './components/LogIn/LogIn';
import LogOut from './components/LogOut/LogOut';
import NavBar from './global/NavBar/NavBar';
import './styles/main.css';
import Cookies from 'js-cookie';

const App = () => {
  // const ssidCookie = Cookies.get('ssid');
  // const [isLoggedIn, setIsLoggedIn] = useState(ssidCookie);
  // const loginStatus = (isLoggedIn: string) => {
  //   setIsLoggedIn(isLoggedIn);
  // };
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/sellers" element={<Sellers />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
