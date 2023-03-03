import React, { useContext, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
import LoginContext from '../../context/LoginContext';
import { requestData, setToken } from '../../services/api';

const BORDER = '1px solid black';

function Checkout() {
  // const setaContext = (role) => useCallback(setaContextUser(role), [role]);
  const { userLogin, setUserLogin } = useContext(LoginContext);
  // const navigate = useNavigate();
  console.log(userLogin);

  const setaContextUser = useCallback(async () => {
    const { role, name } = await requestData('/user/validate');

    if (role === localStorage.getItem('role')) {
      console.log(`role: ${role}`);
      setUserLogin({
        token: localStorage.getItem('token'),
        role: localStorage.getItem('role'),
        name,
      });
    } else {
      console.log('navigateeeeee');
    }
  }, [setUserLogin]);

  // const setaContext = useRef({
  //   setaContextUser,
  // });

  useEffect(() => {
    const verificaToken = async () => {
      try {
        if (localStorage.getItem('logado') === 'true') {
          setToken(localStorage.getItem('token'));
          // setaContext();
          setaContextUser();
        } else {
          console.log('ola');
        }
      } catch (error) {
        console.log('navigate');
      }
    };
    verificaToken();
  }, [setaContextUser]);

  return (
    <div style={ { display: 'flex', width: '100%', border: BORDER } }>
      teste
    </div>
  );
}

export default Checkout;
