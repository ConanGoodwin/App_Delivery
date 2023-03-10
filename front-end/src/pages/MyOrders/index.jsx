import React, { useCallback, useContext, useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import {
  COSTUMER_ORDERS_CARD_PRICE_ID,
  COSTUMER_ORDERS_DATE_ID,
  CUSTOMER_DELIVERY_STATUS_ID,
  CUSTOMER_ORDERS_ID,
} from '../../constant/myOrders_dataTestId';
import LoginContext from '../../context/LoginContext';
import { requestData } from '../../services/api';
import verficaToken from '../../utils/auth/verficaToken';
import './style.css';

function MyOrders() {
  const { setUserLogin } = useContext(LoginContext);
  const [allSales, setAllSales] = useState([]);
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
      const respValida = await verficaToken('customer');
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
    const getCustomerSales = async () => {
      try {
        const getSales = await requestData('/sales');
        setAllSales(getSales);
      } catch (error) { console.log('bad request'); }
    };
    getCustomerSales();
  }, []);

  const addZeros = (dataId) => {
    const padding = 4;

    return String(dataId).padStart(padding, '0');
  };

  function convertDate(dateString) {
    const dateObj = new Date(dateString);
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    // const year = dateObj.getFullYear().toString().slice(2); // o ano precisa ser por extenso

    return `${day}/${month}/${dateObj.getFullYear()}`;
  }

  function formatCurrency(value) {
    const formattedValue = `R$ ${Number(value).toFixed(2).replace('.', ',')}`;
    return formattedValue;
  }

  return (
    <div className="sales">
      <h1 className="sales__title">Meus pedidos</h1>
      {allSales.map((data) => (
        <div className="sale" key={ data.id }>
          <Link className="sale__link" to={ `/customer/orders/${data.id}` }>
            <span className="sale__id" data-testid={ `${CUSTOMER_ORDERS_ID}-${data.id}` }>
              <strong>Pedido:</strong>
              {' '}
              {addZeros(data.id)}
            </span>
            <span
              className={ `sale__status ${data.status}` }
              data-testid={ `${CUSTOMER_DELIVERY_STATUS_ID}-${data.id}` }
            >
              {/* <strong>Status: </strong> */}
              {' '}
              {data.status}
              {' '}
              {
                (data.status === 'Em Trânsito')
                  ? (
                    <img
                      className="icon_moto"
                      src="http://localhost:3001/images/moto.png"
                      alt="sem"
                    />
                  ) : null
              }
            </span>
            <span
              className="sale__date"
              data-testid={ `${COSTUMER_ORDERS_DATE_ID}-${data.id}` }
            >
              <strong>Data:</strong>
              {' '}
              {convertDate(data.saleDate)}
            </span>
            <span
              className="sale__price"
              data-testid={ `${COSTUMER_ORDERS_CARD_PRICE_ID}-${data.id}` }
            >
              <strong>Preço total:</strong>
              {' '}
              {formatCurrency(data.totalPrice)}
            </span>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default MyOrders;
