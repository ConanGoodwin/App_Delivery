import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestPost, setToken } from '../../services/api';
import LoginContext from '../../context/LoginContext';
import isValidEmail from '../../validations/validationEmail';
import {
  COMMON_LOGIN_BTN_L,
  COMMON_LOGIN_BTN_R,
  COMMON_LOGIN_EMAIL,
  COMMON_LOGIN_INVALID,
  COMMON_LOGIN_PASSWORD } from '../../constant/register_dataTestId';
// import RedirectLogin from '../../utils/redirectLogin';
const MAX_PASSWORD_LENGTH = 6;

function Login() {
  const { setUserLogin } = useContext(LoginContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  // const [isLogged, setIsLogged] = useState(false);
  const [failedTryLogin, setFailedTryLogin] = useState(false);
  const [isDisabledButton, setIsDisabledButton] = useState(false);

  useEffect(() => {
    const validateRegistration = () => {
      const isValidPassword = password.length >= MAX_PASSWORD_LENGTH;

      const isValidEmAil = isValidEmail(email);

      const result = isValidPassword && isValidEmAil;

      return result;
    };
    setIsDisabledButton(validateRegistration());
  }, [email, password]);

  const login = async (event) => {
    event.preventDefault();

    try {
      const { token, role } = await requestPost('/user/login', { email, password });
      setToken(token);
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      setUserLogin({ token, role });
      switch (role) {
      case 'customer':
        navigate(`/${role}/products`);
        break;
      case 'seller':
        navigate(`/${role}/orders`);
        break;
      case 'administrator':
        navigate('/admin/manage');
        break;
      default:
        break;
      }
      // RedirectLogin(email, password);
      // setIsLogged(true);
    } catch (error) {
      setFailedTryLogin(true);
      // setIsLogged(false);
    }
  };

  useEffect(() => {
    // if (!(/^[^ ^@]+@[^ ^@^.]+\.[c][o][m](\.[A-Za-z^.]{2})?$/i).test(email))
    // password.length < 6
    // melhor importar um função, porque estas mesmas validações terão de ser feitas da tela de Register
    setFailedTryLogin(false);
  }, [email, password]);

  const handleRegisterBtn = () => {
    navigate('/register');
  };
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
          type="button"
          data-testid={ COMMON_LOGIN_BTN_L }
          disabled={ !isDisabledButton }
          onClick={ (event) => login(event) }
          // disabled = { estado true } // tem de mudar para false quando o regex e o lenght no useEffect form false
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
