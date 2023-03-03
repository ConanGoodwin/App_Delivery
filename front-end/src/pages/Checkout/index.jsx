import React, { useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginContext from '../../context/LoginContext';
import { requestData, setToken } from '../../services/api';

const BORDER = '1px solid black';

function Checkout() {
  const { userLogin, setUserLogin } = useContext(LoginContext);
  const navigate = useNavigate();

  const setaContextUser = useCallback(async (name) => {
    setUserLogin({
      token: localStorage.getItem('token'),
      role: localStorage.getItem('role'),
      name,
    });
  }, [setUserLogin]);

  // const setaContext = useRef({
  //   setaContextUser,
  // });

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
    <div style={ { display: 'flex', width: '100%', border: BORDER } }>
      teste
    </div>
  );
}

export default Checkout;
