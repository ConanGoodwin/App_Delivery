import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import LoginContext from './LoginContext';

function LoginProvider({ children }) {
  const [userLogin, setUserLogin] = useState({ token: '', role: '', name: '' });
  const [products, setProducts] = useState([
    { id: 1, name: 'teste', qt: 3, unitPrice: 0.00, subTotal: 0.00 },
    { id: 2, name: 'maisteste', qt: 8, unitPrice: 0.00, subTotal: 0.00 },
  ]);
  const stateObj = useMemo(() => ({
    userLogin,
    setUserLogin,
    products,
    setProducts,
  }), [userLogin, products]);

  return (
    <LoginContext.Provider value={ stateObj }>
      {children}
    </LoginContext.Provider>
  );
}

export default LoginProvider;

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
