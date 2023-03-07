import { Link } from 'react-router-dom';
import {
  COSTUMER_ORDERS_CARD_PRICE_ID,
  COSTUMER_ORDERS_DATE_ID,
  CUSTOMER_DELIVERY_STATUS_ID,
  CUSTOMER_ORDERS_ID,
} from '../../constant/myOrders_dataTestId';

function MyOrders(id) {
  return (
    <div key={ id }>
      <h1>Meus pedidos</h1>
      <Link to={ `/customer/orders/${id} ` }>
        <span data-testid={ `${CUSTOMER_ORDERS_ID}-${id}` }>
          Pedido: 0001
        </span>

        <span data-testid={ `${CUSTOMER_DELIVERY_STATUS_ID}-${id}` }>
          Status: PENDENTE
        </span>

        <span
          data-testid={ `${COSTUMER_ORDERS_DATE_ID}-${id}` }
        >
          08/04/21
        </span>

        <span data-testid={ `${COSTUMER_ORDERS_CARD_PRICE_ID}-${id}` }>
          Preço total: 23,80
        </span>
      </Link>
    </div>
  );
}

export default MyOrders;
