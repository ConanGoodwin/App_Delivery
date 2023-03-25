import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import LoginContext from '../context/LoginContext';
import imgFunction from '../images/shopping.png';
import imgSale from '../images/icon_sale.png';
import imgAdm from '../images/adm.png';
import exitIcon from '../images/exit_icon.png';

function NavBar() {
  const { userLogin, setUserLogin, cart, setCart } = useContext(LoginContext);
  const src = `${
    process.env.API_URL || 'http://localhost:3001'
  }/images/shopping_cart_market_ecommerce_icon_144576(2).png`;

  const handleClickLogout = () => {
    setUserLogin({ token: '', role: '', name: '' });
    setCart([]);
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
  };

  return (
    <nav>
      <div
        className="navBarFunction"
        style={
          (() => {
            if (
              userLogin.role === 'administrator'
              && window.screen.width > '600'
            ) return ({ width: '300px' });
          })()
        }
      >
        <Link
          className="linkProduct"
          to={
            (() => {
              if (userLogin.role === 'customer') return '/customer/products';
              if (userLogin.role === 'seller') return '/seller/orders';
              if (userLogin.role === 'administrator') return '/admin/manage';
            })()
          }
          data-testid={
            (() => {
              if (userLogin.role === 'customer') {
                return 'customer_products__element-navbar-link-products';
              }
              if (userLogin.role === 'seller') {
                return 'customer_products__element-navbar-link-orders';
              }
              if (userLogin.role === 'administrator') {
                return 'customer_products__element-navbar-link-orders';
              }
            })()
          }
        >
          <img
            className="imgFunction"
            src={
              (() => {
                if (userLogin.role === 'customer') return imgFunction;
                if (userLogin.role === 'seller') return imgSale;
                if (userLogin.role === 'administrator') return imgAdm;
              })()
            }
            alt="sem"
          />
          {(() => {
            if (userLogin.role === 'customer') return <p className="txtFunc">PRODUTOS</p>;
            if (userLogin.role === 'seller') return <p className="txtFunc">PEDIDOS</p>;
            if (userLogin.role === 'administrator') {
              return <p className="txtFunc">GERENCIAR USUARIOS</p>;
            }
          })()}
        </Link>
      </div>
      <div className="navBarLabelTela">
        { (userLogin.role === 'customer')
          ? (
            <Link
              to="/customer/orders"
              style={ { marginLeft: '20px', textDecoration: 'none', color: 'white' } }
              data-testid="customer_products__element-navbar-link-orders"
            >
              MEUS PEDIDOS

            </Link>
          )
          : null }
        { (userLogin.role === 'customer' && cart.length > 0)
          ? (
            <div className="cartLogo">
              <Link to="/customer/checkout" style={ { width: '30px' } }>
                <img
                  src={ src }
                  alt="DATABASE OUT"
                />
              </Link>
              <div
                style={ {
                  border: '1px solid black',
                  borderRadius: '100%',
                  fontSize: 'small',
                  height: '15px',
                  width: '15px',
                  textAlign: 'center',
                  fontFamily: 'college',
                  backgroundColor: 'whitesmoke' } }
              >
                {cart.length }
              </div>
            </div>
          )
          : null }
      </div>
      <div className="navBarName">
        <p
          data-testid="customer_products__element-navbar-user-full-name"
          style={ { color: 'white' } }
        >
          { userLogin.name }

        </p>
      </div>
      <div
        className="navBarLogout"
      >
        <Link
          className="linkExit"
          to="/login"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ handleClickLogout }
          style={ { color: 'white' } }
        >
          <img className="exitIcon" src={ exitIcon } alt="sem" />
          <span className="spanExit">Sair</span>
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
