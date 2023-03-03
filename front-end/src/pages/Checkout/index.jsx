import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginContext from '../../context/LoginContext';
import { requestData, setToken } from '../../services/api';

const BORDER = '1px solid black';

function Checkout() {
  const { userLogin, setUserLogin } = useContext(LoginContext);
  const [sellers, setSellers] = useState('');
  const navigate = useNavigate();

  const setaContextUser = useCallback(async (name) => {
    setUserLogin({
      token: localStorage.getItem('token'),
      role: localStorage.getItem('role'),
      name,
    });
  }, [setUserLogin]);

  useEffect(() => {
    setSellers('teste');
    console.log(sellers);
  }, [sellers]);

  useEffect(() => {
    const verificaToken = async () => {
      try {
        if (localStorage.getItem('logado') === 'true') {
          setToken(localStorage.getItem('token'));
          const { name } = await requestData('/user/validate');
          setaContextUser(name);
          if (localStorage.getItem('role') !== 'customer') {
            console.log('quebra de segurança');
            setUserLogin({ token: '', role: '', name: '' });
            navigate('/login');
          }
        } else {
          const { role } = await requestData('/user/validate');
          if (!role) {
            console.log('token invalido');
            navigate('/login');
          }
        }
      } catch (error) {
        console.log('deslogado');
        navigate('/login');
      }
    };
    verificaToken();
  }, [
    navigate,
    setUserLogin,
    setaContextUser,
    userLogin.role,
    userLogin.token,
  ]);

  return (
    <form
      style={ { display: 'flex',
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        border: BORDER } }
    >
      <section style={ { display: 'flex', flexDirection: 'column', width: '80%', border: BORDER } }>
        <h4>Finalizar Pedido</h4>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Descrição</th>
              <th>Quantidade</th>
              <th>Valor Unitário</th>
              <th>Sub-total</th>
              <th>Remover Item</th>
            </tr>
          </thead>
          <tbody />
        </table>
      </section>
      <section style={ { display: 'flex', width: '80%', border: BORDER } }>
        <h4>Detalhes e Endereço para Entrega</h4>
      </section>
      <section>
        <button type="button">FINALIZAR PEDIDO</button>
      </section>
    </form>
  );
}

export default Checkout;
