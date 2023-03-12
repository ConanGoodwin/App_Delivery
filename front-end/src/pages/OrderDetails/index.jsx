import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoginContext from '../../context/LoginContext';
import { setToken, requestData, requestPut } from '../../services/api';
import TableCart from '../../components/TableCart';
import { LABEL_DEL_STATUS,
  LABEL_ORDER_DATE,
  LABEL_ORDER_ID,
  LABEL_SELLER_NAME,
  TOTAL_PRICE, BTN_CHECK } from '../../constant/orderDetails_dataTestId';
import verficaToken from '../../utils/auth/verficaToken';

function handleChange() {
  console.log('oi');
}

const NUMBER_ONE = 1;
const NUMBER_TWO = 2;
const NUMBER_TREE = 3;

function OrderDetails() {
  const { setSales, userLogin, setUserLogin } = useContext(LoginContext);
  const [data, setData] = useState([]);
  const [totalCart, setTotalCart] = useState(0);
  const [seller, setSeller] = useState('');
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const dataTestId = {
    id: 'customer_order_details__element-order-table-item-number',
    name: 'customer_order_details__element-order-table-name',
    quantity: 'customer_order_details__element-order-table-quantity',
    price: 'customer_order_details__element-order-table-unit-price',
    subTotal: 'customer_order_details__element-order-table-sub-total',
    btnRemove: '',
  };

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
    const getSales = async () => {
      try {
        setToken(userLogin.token);
        const allSales = await requestData('/sales');
        const allUsers = await requestData('/user');
        const allProducts = await requestData('/product');
        const sale = await requestData(`/salesProducts/${id}`);
        Promise.all([allSales, allUsers, allProducts, sale]);
        const formatSaleProject = sale.map((item) => {
          const prod = allProducts.find((produc) => produc.id === item.productId);
          return {
            name: prod.name,
            qt: item.quantity,
            subTotal: prod.price * item.quantity,
            unitPrice: prod.price,
          };
        });
        setData(formatSaleProject);
        const currentOrder = allSales.find((item) => item.id === Number(id));
        setOrderId(currentOrder);
        const userSeller = allUsers
          .find((item) => Number(item.id) === currentOrder.sellerId);
        setSeller(userSeller.name);
        setStatus(currentOrder.status);
      } catch (error) { console.log(error.message); }
    };
    getSales();
  }, [id, setSales, userLogin.token]);

  const acomuladora = (value) => {
    if (totalCart !== value) {
      setTotalCart(value);
    }
  };

  const formatId = () => {
    if (id) {
      switch (id.length) {
      case NUMBER_ONE:
        return ` 000${id}`;
      case NUMBER_TWO:
        return ` 00${id}`;
      case NUMBER_TREE:
        return ` 0${id}`;
      default:
        return ` ${id}`;
      }
    }
  };

  const formatDate = () => {
    const date = new Date(orderId.saleDate);
    return date.toLocaleDateString('pt-br');
  };

  const handleBtnStatus = () => {
    const body = {
      ...orderId,
      status: 'Entregue',
    };
    const fecthProducts = async () => {
      const products = await requestPut(`/sales/update/${id}`, body);
      setStatus(products.status);
      setOrderId(products);

      // navigate('/customer/orders');

      return products;
    };
    fecthProducts();
  };

  return (
    <form style={ { alignItems: 'flex-start', padding: '10px' } }>
      <div style={ { display: 'flex', justifyContent: 'left', width: '100%' } }>
        <h4>Detalhes do Pedido</h4>
      </div>
      <p data-testid={ LABEL_ORDER_ID }>
        PEDIDO
        {' '}
        {formatId()}
      </p>
      <p data-testid={ LABEL_SELLER_NAME }>
        Vendedora:
        {' '}
        {seller}
      </p>
      <p data-testid={ LABEL_ORDER_DATE }>{formatDate()}</p>
      <div style={ { display: 'flex', alignItems: 'center' } }>
        <p data-testid={ LABEL_DEL_STATUS }>
          {orderId.status}
        </p>
        <p>
          {
            (orderId.status === 'Em Trânsito')
              ? (
                <img
                  className="icon_moto"
                  src="http://localhost:3001/images/moto.png"
                  alt="sem"
                />
              ) : null
          }
        </p>
        <p>
          {
            (orderId.status === 'Entregue')
              ? (
                <img
                  className="icon_moto"
                  src="http://localhost:3001/images/ok_accept_15562.png"
                  alt="sem"
                  style={ { width: '20px', marginLeft: '5px' } }
                />
              ) : null
          }
        </p>
        <p>
          {
            (orderId.status === 'Preparando')
              ? (
                <img
                  src="http://localhost:3001/images/package.png"
                  alt="sem"
                  style={ { width: '30px', marginLeft: '5px' } }
                />
              ) : null
          }
        </p>
        <p>
          {
            (orderId.status === 'Pendente')
              ? (
                <img
                  src="http://localhost:3001/images/loading.png"
                  alt="sem"
                  style={ { width: '20px', marginLeft: '5px' } }
                />
              ) : null
          }
        </p>
      </div>
      <button
        type="button"
        data-testid={ BTN_CHECK }
        onClick={ handleBtnStatus }
        disabled={ status !== 'Em Trânsito' }
        className="button_finish_sale"
      >
        MARCAR COMO ENTREGUE
      </button>

      <div style={ { display: 'flex', justifyContent: 'right', width: '100%' } }>
        <TableCart
          acomuladora={ acomuladora }
          handleChange={ handleChange }
          dataTestId={ dataTestId }
          data={ data }
        />
      </div>
      <h4 style={ { textAlign: 'right', width: '100%' } }>
        Total: R$
        {' '}
        <span data-testid={ TOTAL_PRICE }>
          { (totalCart).toFixed(2).replace('.', ',') }
        </span>
      </h4>
    </form>
  );
}

export default OrderDetails;
