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

import bgimg from '../../images/ee.jpg';
import logo from '../../images/logo2.png';
// import RedirectLogin from '../../utils/redirectLogin';
const MAX_PASSWORD_LENGTH = 6;

function Login() {
  const { userLogin, setUserLogin } = useContext(LoginContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [logado, setLogado] = useState(false);
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

  // useEffect(() => {
  //   setUserLogin({ token: '', role: '', name: '' });
  //   setCart([]);
  // }, [setCart, setUserLogin]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.role === 'customer') {
      setUserLogin(user);
      navigate('/customer/products');
    }
  }, [navigate, setUserLogin]);

  useEffect(() => {
    setLogado(localStorage.getItem('logado') === 'true');
  }, []);

  const login = async (event) => {
    event.preventDefault();

    try {
      const { token, role, name } = await requestPost('/user/login', { email, password });
      setToken(token);
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      setUserLogin({ token, role, name });
      localStorage.setItem('user', JSON.stringify({ token, name, email, role }));
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
    setFailedTryLogin(false);
  }, [email, password]);

  const handleRegisterBtn = () => {
    navigate('/register');
  };

  const onInputChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;

    setLogado(value);
    localStorage.setItem('logado', value);

    // if (target.id === 'filtroTrunfo') this.setState({ isFilterdisabled: value });

    // this.setState({ [target.id]: value }, () => {
    //   const validaOk = this.validaBotao();
    //   this.setState({ isSaveButtonDisabled: validaOk });
    // });
  };

  return (
    <div className="container_login">
      {/* {
        ((JSON
          .parse(localStorage.getItem('user'))) && (JSON
          .parse(localStorage.getItem('user')))
          .role === 'customer') && navigate('/customer/products')
      } */}
      <div className="container_login_bg">
        <img className="bg_login" src={ bgimg } alt="dsds" />
        <form>
          <img className="logo_login" src={ logo } alt="logo" />
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
              className="password_input"
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
            className="button_login"
            data-testid={ COMMON_LOGIN_BTN_L }
            disabled={ !isDisabledButton }
            onClick={ (event) => login(event) }
          >
            LOGIN
          </button>

          <button
            type="button"
            data-testid={ COMMON_LOGIN_BTN_R }
            className="button_create_account"
            onClick={ handleRegisterBtn }
          >
            Ainda não tenho conta
          </button>
          <label htmlFor="chkTrunfo">
            <input
              type="checkbox"
              className="checkbox"
              id="chkTrunfo"
              checked={ logado }
              onChange={ onInputChange }
              data-testid="trunfo-input"
            />
            Permanecer logado
          </label>
        </form>
      </div>
    </div>
  );
}

export default Login;
