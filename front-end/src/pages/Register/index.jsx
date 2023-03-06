import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import isValidEmail from '../../validations/validationEmail';
import {
  COMMON_REGISTER_BUTTON,
  COMMON_REGISTER_EMAIL,
  COMMON_REGISTER_INVALID,
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
  const [failedTryRegister, setfailedTryRegister] = useState(false);

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

  useEffect(() => {
    setUserLogin({ token: '', role: '', name: '' });
  }, [setUserLogin]);

  const resetInput = () => {
    setEmail('');
    setUserName('');
    setPassword('');
    setIsDisabledButton(false);
    setfailedTryRegister(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    resetInput();
    try {
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
    } catch (error) {
      return setfailedTryRegister(true);
    }
  };

  return (
    <div className="container_login">
      <form onSubmit={ handleSubmit }>
        <h2>Cadastro</h2>
        <input
          className="input_name_register"
          type="text"
          id="name-input"
          value={ userName }
          onChange={ (event) => setUserName(event.target.value) }
          placeholder="Seu nome"
          data-testid={ COMMON_REGISTER_NAME }
        />
        <input
          className="input_email_register"
          type="email"
          id="email-input"
          value={ email }
          onChange={ (event) => setEmail(event.target.value) }
          placeholder="seu-email@site.com.br"
          data-testid={ COMMON_REGISTER_EMAIL }
        />
        <input
          className="input_password_register"
          type="password"
          id="email-input"
          value={ password }
          onChange={ (event) => setPassword(event.target.value) }
          placeholder="***********"
          data-testid={ COMMON_REGISTER_PASSWORD }
        />
        <button
          className="button_register"
          type="submit"
          disabled={ !isDisabledButton }
          data-testid={ COMMON_REGISTER_BUTTON }
        >
          Cadastrar

        </button>
      </form>
      {
        (failedTryRegister)
          ? (
            <p data-testid={ COMMON_REGISTER_INVALID }>
              O campo [nome] ou [email] já foi cadastrado!
            </p>
          )
          : ''
      }

    </div>
  );
}

export default LoginForm;
