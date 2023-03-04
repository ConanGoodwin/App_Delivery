import { Navigate, Route, Routes } from 'react-router-dom';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={ <Navigate to="/login" /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/register" element={ <Register /> } />
      <Route path="/customer/products" element={ <Products /> } />
      <Route path="/customer/products/checkout" element={ <Checkout /> } />
    </Routes>
  );
}
