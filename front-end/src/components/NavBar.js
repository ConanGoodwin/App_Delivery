import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import LoginContext from '../context/LoginContext';

const BORDER = '1px solid black';

function NavBar() {
  const { userLogin } = useContext(LoginContext);

  return (
    <nav style={ { display: 'flex', width: '100%', border: BORDER } }>
      <div
        style={ {
          display: 'flex',
          justifyContent: 'center',
          border: BORDER,
          width: '15%' } }
      >
        <Link
          to={
            (() => {
              if (userLogin.role === 'customer') return '/customer/products';
              if (userLogin.role === 'seller') return '/teste';
              if (userLogin.role === 'administrator') return '/teste';
            })()
          }
          data-testid="customer_products__element-navbar-link-products"
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
          border: BORDER,
          width: '60%',
          justifyContent: 'left',
          alignItems: 'center' } }
      >
        { (userLogin.role === 'customer')
          ? (
            <Link
              to="/customer/orders"
              style={ { marginLeft: '20px' } }
              data-testid="customer_products__element-navbar-link-orders"
            >
              MEUS PEDIDOS

            </Link>
          )
          : null }
      </div>
      <div
        style={ {
          display: 'flex',
          justifyContent: 'center',
          border: BORDER,
          width: '15%' } }
      >
        <p
          data-testid="customer_products__element-navbar-user-full-name"
        >
          { userLogin.name }

        </p>
      </div>
      <div
        style={ { display: 'flex',
          border: BORDER,
          width: '10%',
          justifyContent: 'center',
          alignItems: 'center' } }
      >
        <Link
          to="/login"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ () => localStorage.removeItem('user') }
        >
          Sair

        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
