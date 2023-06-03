import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
// import Sellers from './components/Sellers';
import Cart from './components/Cart/Cart';
import NotFound from './components/NotFound/NotFound';
import LogIn from './components/LogIn/LogIn';
import LogOut from './components/LogOut/LogOut';
import NavBar from './global/NavBar/NavBar';
import SellerDashboard from './components/SellerDashboard/SellerDashboard';
import RequireAuth from './components/RequireAuth/RequireAuth';
import PersistLogin from './components/PersistLogin/PersistLogin';
import './styles/main.css';
import Cookies from 'js-cookie';
import Register from './components/Register/Register';
import Layout from './components/Layout/Layout';

const App = () => {
  return (
    <main className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/register" element={<Register />} />
          {/* private routes */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route path="/dashboard" element={<SellerDashboard />} />
              {/* will also pass checkout route here */}
            </Route>
          </Route>
          {/* catch all route */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;
