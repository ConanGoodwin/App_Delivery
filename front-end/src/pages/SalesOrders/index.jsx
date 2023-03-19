import React, { useCallback, useContext, useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import {
  SELLER_ORDERS_CARD_PRICE_ID,
  SELLER_ORDERS_DATE_ID,
  SELLER_DELIVERY_STATUS_ID,
  SELLER_ORDERS_ID,
  SELLER_ORDERS_STREET_ID,
} from '../../constant/salesOrders_dataTestId';
import LoginContext from '../../context/LoginContext';
import { requestData } from '../../services/api';
import verficaToken from '../../utils/auth/verficaToken';

function SalesOrders() {
  const { setUserLogin } = useContext(LoginContext);
  const [idCustomer, setIdCustomer] = useState(0);
  const [allSales, setAllSales] = useState([]);
  const navigate = useNavigate();

  const setaContextUser = useCallback(async ({ name }) => {
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
      const respValida = await verficaToken('seller');
      if (respValida === 'error') {
        setUserLogin({ token: '', role: '', name: '' });
        navigate('/login');
      }
      if (localStorage.getItem('logado') === 'true') {
        setaContextUser(respValida);
        setIdCustomer(Number(respValida.id));
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
        // const salesFiltred = getSales.filter(({ status }) => status !== 'Entregue');
        const sellerSales = getSales.filter(({ sellerId }) => sellerId === idCustomer);

        setAllSales(sellerSales.reverse());
        // setAllSales(getSales);
      } catch (error) { console.log('bad request'); }
    };
    getCustomerSales();
  }, [idCustomer]);

  // console.log(allSales);

  const addZeros = (dataId) => {
    const padding = 4;

    return String(dataId).padStart(padding, '0');
  };

  function convertDate(dateString) {
    const dateObj = new Date(dateString);

    const day = dateObj.getDate().toString().padStart(2, '0');

    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');

    return `${day}/${month}/${dateObj.getFullYear()}`;
  }

  function formatCurrency(value) {
    const formattedValue = `R$ ${Number(value).toFixed(2).replace('.', ',')}`;
    return formattedValue;
  }

  return (
    <div className="sales">
      <h1 className="sales__title">Minhas vendas</h1>
      { (allSales.length === 0)
        ? (<div className="sale">Nenhum historico de pedidos para este vendedor.</div>)
        : null}
      {allSales.map((data) => (
        <div className="sale" key={ data.id }>
          <Link className="sale__link" to={ `/seller/orders/${data.id} ` }>
            <span className="sale__id" data-testid={ `${SELLER_ORDERS_ID}-${data.id}` }>
              {`Pedido ${addZeros(data.id)} `}
            </span>
            <div className={ `sale__status ${data.status}` }>
              <span data-testid={ `${SELLER_DELIVERY_STATUS_ID}-${data.id}` }>
                {/* Status: */}
                {' '}
                {data.status}
              </span>
              <p>
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
              </p>
            </div>
            <span
              className="sale__date"
              data-testid={ `${SELLER_ORDERS_DATE_ID}-${data.id}` }
            >
              <strong>Data:</strong>
              {' '}
              {convertDate(data.saleDate)}
            </span>
            <span data-testid={ `${SELLER_ORDERS_CARD_PRICE_ID}-${data.id}` }>
              Preço total:
              {' '}
              {formatCurrency(data.totalPrice)}
            </span>
            <br />
            <span data-testid={ `${SELLER_ORDERS_STREET_ID}-${data.id}` }>
              <strong style={ { marginLeft: '20px' } }>Endereço:</strong>
              {
                ` ${
                  (data.deliveryAddress)
                    ? data.deliveryAddress : '<vazio>'
                }, 
                  ${
        (data.deliveryNumber)
          ? data.deliveryNumber : '<vazio>'
        }`
              }
            </span>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default SalesOrders;
// teste
