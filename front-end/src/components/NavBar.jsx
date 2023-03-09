import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import LoginContext from '../context/LoginContext';

// const BORDER = '1px solid black';

function NavBar() {
  const { userLogin, setUserLogin, setCart } = useContext(LoginContext);

  const handleClickLogout = () => {
    setUserLogin({ token: '', role: '', name: '' });
    setCart([]);
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
  };

  return (
    <nav>
      <div
        className="teste"
        style={ {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          // border: BORDER,
          // borderRight: 'no',
          // borderRadius: '20px',
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
          borderBottomLeftRadius: '20px',
          // borderRight: '3px solid',
          backgroundColor: '#556662',
          width: '15%' } }
      >
        <Link
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
          style={ { color: 'white' } }
        >
          {(() => {
            if (userLogin.role === 'customer') return <p>PRODUTOS</p>;
            if (userLogin.role === 'seller') return <p>PEDIDOS</p>;
            if (userLogin.role === 'administrator') return <p>GERENCIAR USUÁRIOS</p>;
          })()}
        </Link>
      </div>
      <div
        style={ { display: 'flex',
          // border: BORDER,
          width: '60%',
          justifyContent: 'left',
          alignItems: 'center',
          backgroundColor: 'rgb(238, 75, 75)' } }
      >
        { (userLogin.role === 'customer')
          ? (
            <Link
              to="/customer/orders"
              style={ { marginLeft: '20px', textDecoration: 'none', color: 'white' } }
              data-testid="customer_products__element-navbar-link-orders"
              color="white"
            >
              MEUS PEDIDOS

            </Link>
          )
          : null }
      </div>
      <div
        style={ {
          display: 'flex',
          // position: 'fixed',
          justifyContent: 'center',
          // border: BORDER,
          boxShadow: '$form-login-box-shadow',
          borderRight: '3px solid rgb(59,59,59)',
          borderBottom: '3px solid rgb(29,29,29, 0.1)',
          borderRadius: '20px',
          margin: '5px',
          width: '15%',
          // backgroundColor: 'blueviolet',
          backgroundColor: 'rgb(241, 25, 25) ',
        } }
      >
        <p
          data-testid="customer_products__element-navbar-user-full-name"
          style={ { color: 'white' } }
        >
          { userLogin.name }

        </p>
      </div>
      <div
        style={ { display: 'flex',
          // border: BORDER,
          borderTopRightRadius: '20px',
          borderBottomLeftRadius: '20px',
          width: '10%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'blue' } }
      >
        <Link
          to="/login"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ handleClickLogout }
          style={ { color: 'white' } }
        >
          Sair

        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
