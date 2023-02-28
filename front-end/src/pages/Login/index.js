import React, { useState } from 'react';
import api from '../../services/api';

function Login() {
  const [user, setUser] = useState('');

  const loginClick = async () => {
    // api.defaults.headers.authorization = 'teste';
    api
      .post('/user/login', {
        email: 'adm@deliveryapp.com',
        password: '--adm2@21!!--',
      })
      .then((response) => setUser(response.data))
      .catch((err) => {
        setUser('');
        console.error(`ops! ocorreu um erro${err}`);
      });
    console.log(user.token);
  };

  return (
    <div>
      Login
      <p>
        Usuário:
        {' '}
        {user?.token}
      </p>
      <button
        type="button"
        onClick={ loginClick }
      >
        Default
      </button>
    </div>
  );
}

export default Login;
