import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import {
  COSTUMER_ORDERS_CARD_PRICE_ID,
  COSTUMER_ORDERS_DATE_ID,
  CUSTOMER_DELIVERY_STATUS_ID,
  CUSTOMER_ORDERS_ID,
} from '../../constant/myOrders_dataTestId';
// import LoginContext from '../../context/LoginContext';
import { requestData } from '../../services/api';

function MyOrders() {
  // const { userLogin, setUserLogin } = useContext(LoginContext);
  const [allSales, setAllSales] = useState([]);
  // const [sales, setSales] = useState([]);

  useEffect(() => {
    const getCustomerSales = async () => {
      try {
        const getSales = await requestData('/sales');
        // setSales(getSales.filter(({ role }) => role === 'customer'));
        setAllSales(getSales);
      } catch (error) { console.log('bad request'); }
    };
    getCustomerSales();
  }, []);

  // console.log(allSales);

  const addZeros = (dataId) => {
    const padding = 4;

    // example https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
    return String(dataId).padStart(padding, '0');
  };

  function convertDate(dateString) {
    // console.log(dateString, 'data recebida');
    const dateObj = new Date(dateString);
    // console.log(dateObj);
    const day = dateObj.getDate().toString().padStart(2, '0');
    // console.log(day, 'day');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    // console.log('month', dateObj.getMonth());
    const year = dateObj.getFullYear().toString().slice(2);
    // console.log(year, 'year');
    return `${day}/${month}/${year}`;
  }

  function formatCurrency(value) {
    // return console.log(typeof value);
    const formattedValue = `R$ ${Number(value).toFixed(2).replace('.', ',')}`;
    return formattedValue;
  }

  return (
    <div>
      <h1>Meus pedidos</h1>
      {allSales.map((data) => (
        <div key={ data.id }>
          <Link to={ `/customer/orders/${data.id} ` }>
            <span data-testid={ `${CUSTOMER_ORDERS_ID}-${data.id}` }>
              {`Pedido ${addZeros(data.id)} `}
            </span>

            <span data-testid={ `${CUSTOMER_DELIVERY_STATUS_ID}-${data.id}` }>
              Status:
              {' '}
              {data.status}
            </span>

            <span
              data-testid={ `${COSTUMER_ORDERS_DATE_ID}-${data.id}` }
            >
              {' '}
              {convertDate(data.saleDate)}
              {' '}
            </span>

            <span data-testid={ `${COSTUMER_ORDERS_CARD_PRICE_ID}-${data.id}` }>
              Preço total:
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
