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
    <nav style={ { display: 'flex', width: '100%', border: BORDER } }>
      <div
        style={ {
          display: 'flex',
          justifyContent: 'center',
          border: BORDER,
          width: '15%' } }
      >
        {
          (() => {
            if (userLogin.role === 'customer') return <p>PRODUTOS</p>;
            if (userLogin.role === 'seller') return <p>PEDIDOS</p>;
            if (userLogin.role === 'administrator') return <p>GERENCIAR USUÁRIOS</p>;
          })()
        }
      </div>
      <div style={ { display: 'flex', border: BORDER, width: '60%' } }>
        { (userLogin.role === 'customer')
          ? <p style={ { marginLeft: '20px' } }>MEUS PEDIDOS</p>
          : null }
      </div>
      <div
        style={ {
          display: 'flex',
          justifyContent: 'center',
          border: BORDER,
          width: '15%' } }
      >
        <p>{ userLogin.name }</p>
      </div>
      <div style={ { display: 'flex', border: BORDER, width: '10%' } }>
        <button type="button" style={ { width: '100%' } }>Sair</button>
      </div>
    </nav>
  );
}

export default NavBar;
