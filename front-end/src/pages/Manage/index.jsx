import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginContext from '../../context/LoginContext';
import { requestData } from '../../services/api';
import verficaToken from '../../utils/auth/verficaToken';
import isValidEmail from '../../validations/validationEmail';

const MAX_NAME_LENGTH = 12;
const MAX_PASSWORD_LENGTH = 6;

function Manage() {
  const { setUserLogin } = useContext(LoginContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [drbSeller, setDrbSeller] = useState('');
  const [isDisabledButton, setIsDisabledButton] = useState(false);
  const [failedTryRegister] = useState(false);
  const navigate = useNavigate();

  // recupera os dados de usuario do local storage e preenche a variavel global user com eles
  const setaContextUser = useCallback(async (name) => {
    const { token, role } = JSON.parse(localStorage.getItem('user'));
    setUserLogin({
      token,
      role,
      name,
    });
  }, [setUserLogin]);

  // faz a validação do token e verifica a role do usuario logado para validar se
  // aquele tipo de usuario tem acesso aquela pagina.
  useEffect(() => {
    const validaToken = async () => {
      const respValida = await verficaToken('administrator');
      if (respValida === 'error') {
        setUserLogin({ token: '', role: '', name: '' });
        navigate('/login');
      }
      if (localStorage.getItem('logado') === 'true') {
        setaContextUser(respValida);
      } else {
        try {
          await requestData('/user/validate');
        } catch (error) {
          setUserLogin({ token: '', role: '', name: '' });
          navigate('/login');
        }
      }
    };
    validaToken();
  }, [navigate, setUserLogin, setaContextUser]);

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

  return (
    <main style={ { display: 'flex', flexDirection: 'column' } }>
      <form>
        <h1>Cadastrar novo usuário</h1>
        <label
          htmlFor="nameInput"
          className="label"
        >
          Nome:
          <input
            className="input_name_register"
            type="text"
            id="nameInput"
            value={ userName }
            onChange={ (event) => setUserName(event.target.value) }
            placeholder="Seu nome"
            data-testid="admin_manage__input-name"
          />
        </label>
        <label
          htmlFor="emailInput"
          className="label"
        >
          Email:
          <input
            className="input_email_register"
            type="email"
            id="emailInput"
            value={ email }
            onChange={ (event) => setEmail(event.target.value) }
            placeholder="seu-email@site.com.br"
            data-testid="admin_manage__input-email"
          />
        </label>
        <label
          htmlFor="passwordInput"
          className="label"
        >
          Senha:
          <input
            className="input_password_register"
            type="password"
            id="passwordInput"
            value={ password }
            onChange={ (event) => setPassword(event.target.value) }
            placeholder="***********"
            data-testid="admin_manage__input-password"
          />
        </label>
        <label
          htmlFor="cmbTypeUser"
          className="label"
        >
          Tipo de usuário
          <select
            id="cmbTypeUser"
            data-testid="admin_manage__select-role"
            name="cmbTypeUser"
            value={ drbSeller }
            onChange={ ({ target: { value } }) => setDrbSeller(value) }
            style={ { width: '100%' } }
          >
            <option value="customer" name="optCustomer">
              customer
            </option>
          </select>
        </label>
        {
          (failedTryRegister)
            ? (
              <p>
                O campo [nome] ou [email] já foi cadastrado!
              </p>
            )
            : ''
        }
        <button
          className="button_register"
          type="submit"
          disabled={ !isDisabledButton }
          data-testid="admin_manage__button-register"
        >
          Cadastrar

        </button>
      </form>
      <section style={ { height: '10px' } }>
        <h1>Lista de usuários cadastrados</h1>
      </section>
    </main>
  );
}

export default Manage;
