import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginContext from '../../context/LoginContext';
import { requestData, requestDelete, requestPost, setToken } from '../../services/api';
import verficaToken from '../../utils/auth/verficaToken';
import isValidEmail from '../../validations/validationEmail';

const MAX_NAME_LENGTH = 12;
const MAX_PASSWORD_LENGTH = 6;

function Manage() {
  const { setUserLogin } = useContext(LoginContext);
  const [data, setData] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [drbSeller, setDrbSeller] = useState('customer');
  const [isDisabledButton, setIsDisabledButton] = useState(false);
  const [failedTryRegister, setFailedTryRegister] = useState(false);
  const navigate = useNavigate();

  const setaContextUser = useCallback(async ({ name }) => {
    const { token, role } = JSON.parse(localStorage.getItem('user'));
    setUserLogin({
      token,
      role,
      name,
    });
  }, [setUserLogin]);

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

  const getData = async () => {
    try {
      const resp = await requestData('/user');
      setData(resp.reverse());
    } catch (error) {
      console.log('bad request!');
    }
  };

  useEffect(() => {
    getData();
  }, []);

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

  async function handleClickInclude() {
    const { token } = JSON.parse(localStorage.getItem('user'));
    try {
      setToken(token);
      const { id } = await requestPost(
        '/adm/register',
        { name: userName, email, password, role: drbSeller },
      );
      if (id) {
        getData();
        setUserName('');
        setEmail('');
        setDrbSeller('customer');
        setPassword('');
      }
      setFailedTryRegister(false);
    } catch (error) {
      setFailedTryRegister(true);
      console.log('bad request');
    }
  }

  async function handleClickExclude({ target: { name } }) {
    try {
      await requestDelete(
        `/adm/user/${name}`,
        { name: userName, email, password, role: drbSeller },
      );
      getData();
    } catch (error) {
      console.log('bad request');
    }
  }

  return (
    <main style={ { display: 'flex', flexDirection: 'column' } }>
      <h1 style={ { width: '85%', margin: '5px' } }>Cadastrar novo usuário</h1>
      <div className="formInputs">
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
            <option value="seller" name="optSeller">
              seller
            </option>
            <option value="administrator" name="optAdministrator">
              administrator
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
            : null
        }
        <button
          className="button_register"
          type="submit"
          disabled={ !isDisabledButton }
          data-testid="admin_manage__button-register"
          onClick={ handleClickInclude }
        >
          Cadastrar
        </button>
      </div>
      <div style={ { height: '350px', overflowY: 'scroll' } }>
        <h1 style={ { marginBottom: '2px' } }>Lista de usuários cadastrados</h1>
        <table width="100%">
          <thead>
            <tr>
              <th>It</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Tipo</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
            { data.map((user, index) => (
              <tr key={ index } className={ (index % 2 !== 0) && 'fundoEscuro' }>
                <td
                  data-testid={
                    `admin_manage__element-user-table-item-number-${index}`
                  }
                >
                  {index + 1}
                </td>
                <td data-testid={ `$admin_manage__input-email-${index}` }>
                  {user.name}
                </td>
                <td data-testid={ `admin_manage__element-user-table-email-${index}` }>
                  {user.email}
                </td>
                <td data-testid={ `admin_manage__element-user-table-role-${index}` }>
                  {user.role}
                </td>
                <td>
                  <button
                    name={ user.id }
                    data-testid={ `admin_manage__element-user-table-remove-${index}` }
                    type="button"
                    onClick={ (target) => handleClickExclude(target) }
                    className="button_remove"
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
export default Manage;
