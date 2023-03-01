import React, { useState, useEffect } from 'react';
// import api from '../../services/api';
import { Navigate } from 'react-router-dom';
import { requestLogin, setToken } from '../../services/api';
import {
  COMMON_LOGIN_BTN_L,
  COMMON_LOGIN_BTN_R,
  COMMON_LOGIN_EMAIL,
  COMMON_LOGIN_INVALID,
  COMMON_LOGIN_PASSWORD } from '../../constant/register_dataTestId';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [register, setRegister] = useState(false);
  // const [isLogged, setIsLogged] = useState(false);
  const [failedTryLogin, setFailedTryLogin] = useState(false);

  const login = async (event) => {
    event.preventDefault();

    try {
      const { token, role } = await requestLogin('/user/login', { email, password });

      setToken(token);

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      // setIsLogged(true);
    } catch (error) {
      setFailedTryLogin(true);
      // setIsLogged(false);
    }
  };

  useEffect(() => {
    setFailedTryLogin(false);
  }, [email, password]);

  const handleRegisterBtn = () => {
    setRegister(true);
  };

  if (register) return <Navigate to="/register" />;

  // const loginClick = async () => {
  //   // api.defaults.headers.authorization = 'teste';
  //   api
  //     .post('/user/login', {
  //       email: 'adm@deliveryapp.com',
  //       password: '--adm2@21!!--',
  //     })
  //     .then((response) => setUser(response.data))
  //     .catch((err) => {
  //       setUser('');
  //       console.error(`ops! ocorreu um erro${err}`);
  //     });
  //   console.log(user.token);
  // };
  // const loginTestId = 'common_login';

  return (
    <div>
      <form>
        <label htmlFor="email-input">
          <input
            className="login__login_input"
            type="text"
            value={ email }
            onChange={ ({ target: { value } }) => setEmail(value) }
            data-testid={ COMMON_LOGIN_EMAIL }
            placeholder="Login"
          />
        </label>
        <label htmlFor="password-input">
          <input
            type="password"
            value={ password }
            onChange={ ({ target: { value } }) => setPassword(value) }
            data-testid={ COMMON_LOGIN_PASSWORD }
            placeholder="Senha"
          />
        </label>
        {
          (failedTryLogin)
            ? (
              <p data-testid={ COMMON_LOGIN_INVALID }>
                {
                  `O endereço de e-mail ou a senha não estão corretos.
                    Por favor, tente novamente.`
                }
              </p>
            )
            : null
        }
        <button
          type="submit"
          data-testid={ COMMON_LOGIN_BTN_L }
          onClick={ (event) => login(event) }
        >
          LOGIN
        </button>
        <button
          type="button"
          data-testid={ COMMON_LOGIN_BTN_R }
          onClick={ handleRegisterBtn }

        >
          Ainda não tenho conta
        </button>
      </form>
    </div>
  );
}

export default Login;
