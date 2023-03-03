import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import LoginContext from './LoginContext';

function LoginProvider({ children }) {
  const [userLogin, setUserLogin] = useState({ token: '', role: '', name: '' });
  const stateObj = useMemo(() => ({
    userLogin,
    setUserLogin,
  }), [userLogin]);

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
