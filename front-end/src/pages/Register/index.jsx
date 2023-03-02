import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import isValidEmail from '../../validations/validationEmail';
// import RedirectLogin from '../../utils/redirectLogin';
import {
  COMMON_REGISTER_BUTTON,
  COMMON_REGISTER_EMAIL,
  // COMMON_REGISTER_INVALID,
  COMMON_REGISTER_NAME,
  COMMON_REGISTER_PASSWORD,
} from '../../constant/register_dataTestId';
import { requestPost, setToken } from '../../services/api';
import LoginContext from '../../context/LoginContext';

const MAX_NAME_LENGTH = 12;
const MAX_PASSWORD_LENGTH = 6;

function LoginForm() {
  const { setUserLogin } = useContext(LoginContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [isDisabledButton, setIsDisabledButton] = useState(false);
  // console.log(isDisabledButton);

  useEffect(() => {
    const validateRegistration = () => {
      const isValidName = userName.length >= MAX_NAME_LENGTH;

      const isValidPassword = password.length >= MAX_PASSWORD_LENGTH;

      const isValidEmAil = isValidEmail(email);

      const result = isValidName && isValidPassword && isValidEmAil;

      return result;
    };
    setIsDisabledButton(validateRegistration());
  }, [email, password, userName]);

  const resetInput = () => {
    setIsDisabledButton(false);
    setEmail('');
    setUserName('');
    setPassword('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    resetInput();

    console.log(`Email: ${email}, Password: ${password}, Name: ${userName}`);
    const { id } = await requestPost(
      '/user/register',
      { name: userName, email, password, role: 'customer' },
    );
    console.log(id);
    if (id) {
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
    }
    // return deixar visivel a messagem de registro invalido.
  };

  return (
    <form onSubmit={ handleSubmit }>
      <h2>Cadastro</h2>
      <label htmlFor="name-input">
        Nome
        <input
          type="text"
          id="name-input"
          value={ userName }
          onChange={ (event) => setUserName(event.target.value) }
          placeholder="Seu nome"
          data-testid={ COMMON_REGISTER_NAME }
        />
      </label>
      <label htmlFor="email-input">
        Email
        <input
          type="email"
          id="email-input"
          value={ email }
          onChange={ (event) => setEmail(event.target.value) }
          placeholder="seu-email@site.com.br"
          data-testid={ COMMON_REGISTER_EMAIL }

        />
      </label>
      <label htmlFor="password-input">
        Senha
        <input
          type="password"
          id="email-input"
          value={ password }
          onChange={ (event) => setPassword(event.target.value) }
          placeholder="***********"
          data-testid={ COMMON_REGISTER_PASSWORD }
        />
      </label>
      <button
        type="submit"
        disabled={ !isDisabledButton }
        data-testid={ COMMON_REGISTER_BUTTON }
      >
        Cadastrar

      </button>
    </form>
  );
}

export default LoginForm;