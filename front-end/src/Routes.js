import { Navigate, Route, Routes } from 'react-router-dom';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import SellerOrderDetail from './pages/SellerOrderDetail.js';
import MyOrders from './pages/MyOrders/index';
import OrderDetails from './pages/OrderDetails';
import SalesOrders from './pages/SalesOrders/index';

export default function Router() {
  return (
    <Routes>
      <Route exact path="/" element={ <Navigate to="/login" /> } />
      <Route exact path="/login" element={ <Login /> } />
      <Route exact path="/register" element={ <Register /> } />
      <Route exact path="/customer/products" element={ <Products /> } />
      <Route exact path="/customer/checkout" element={ <Checkout /> } />
      <Route exact path="/customer/orders" element={ <MyOrders /> } />
      <Route exact path="/customer/orders/:id" element={ <OrderDetails /> } />
      <Route exact path="/seller/orders" element={ <SalesOrders /> } />
      <Route exact path="/seller/orders/:id" element={ <SellerOrderDetail /> } />
    </Routes>
  );
}
