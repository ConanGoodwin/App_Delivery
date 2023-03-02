// import React, { useState, useEffect, useContext } from 'react';
import React, { useContext } from 'react';
import LoginContext from '../context/LoginContext';
// import { useNavigate } from 'react-router-dom';
// import { requestPost, setToken } from '../../services/api';
// import LoginContext from '../../context/LoginContext';
// import {
//   COMMON_LOGIN_BTN_L,
//   COMMON_LOGIN_BTN_R,
//   COMMON_LOGIN_EMAIL,
//   COMMON_LOGIN_INVALID,
//   COMMON_LOGIN_PASSWORD } from '../../constant/register_dataTestId';

const BORDER = '1px solid black';

function NavBar() {
  const { userLogin } = useContext(LoginContext);
  // useEffect(() => {
  //   // if (!(/^[^ ^@]+@[^ ^@^.]+\.[c][o][m](\.[A-Za-z^.]{2})?$/i).test(email))
  //   // password.length < 6
  //   // melhor importar um função, porque estas mesmas validações terão de ser feitas da tela de Register
  //   setFailedTryLogin(false);
  // }, [email, password]);

  return (
    <div style={ { display: 'flex', width: '100%', border: BORDER } }>
      <div style={ { border: BORDER } }>
        {
          (userLogin.role === 'customer') ? <p>PRODUTOS</p>
            : (userLogin.role === 'seller') ? <p>PEDIDOS</p>
              : (userLogin.role === 'administrator') ? <p>GRENCIAR USUÁRIOS</p> : null
        }
      </div>
      <div style={ { border: BORDER } }>
        { userLogin.role }
      </div>
      <div style={ { border: BORDER } }>
        { userLogin.name }
      </div>
      <div style={ { border: BORDER } }>
        teste:
      </div>
    </div>
  );
}

export default NavBar;
