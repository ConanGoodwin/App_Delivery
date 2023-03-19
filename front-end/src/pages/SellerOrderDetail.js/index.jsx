import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TableCart from '../../components/TableCart';
import LoginContext from '../../context/LoginContext';
import { requestData, requestPut } from '../../services/api';
import verficaToken from '../../utils/auth/verficaToken';

function handleChange() {
  console.log('oi');
}

const NUMBER_ONE = 1;
const NUMBER_TWO = 2;
const NUMBER_TREE = 3;

function SellerOrderDetail() {
  const { setUserLogin } = useContext(LoginContext);
  const [totalCart, setTotalCart] = useState(0);
  const [sale, setSale] = useState({});
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const dataTestId = {
    id: 'seller_order_details__element-order-table-item-number',
    name: 'seller_order_details__element-order-table-name',
    quantity: 'seller_order_details__element-order-table-quantity',
    price: 'seller_order_details__element-order-table-unit-price',
    subTotal: 'seller_order_details__element-order-table-sub-total',
    btnRemove: '',
  };

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
    const getData = async () => {
      try {
        const allSaleProducts = await requestData(`/salesProducts/${id}`);
        const allProducts = await requestData('/product');
        const allSales = await requestData('/sales');
        const formatSaleProject = allSaleProducts.map((item) => {
          const prod = allProducts.find((produc) => produc.id === item.productId);
          return {
            name: prod.name,
            qt: item.quantity,
            subTotal: prod.price * item.quantity,
            unitPrice: prod.price,
          };
        });
        setSale(allSales.find((item) => item.id === Number(id)));
        setData(formatSaleProject);
      } catch (error) {
        console.log('bad request');
      }
    };
    getData();
  }, [id]);

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
    const date = new Date(sale.saleDate);
    return date.toLocaleDateString('pt-br');
  };

  const handleBtnStatus = ({ target: { name } }) => {
    let body = { ...sale };

    if (name === 'btnPrepara') body = { ...sale, status: 'Preparando' };
    if (name === 'btnEntrega') body = { ...sale, status: 'Em Trânsito' };

    const fecthProducts = async () => {
      const products = await requestPut(`/sales/update/${id}`, body);

      setSale(products);
      return products;
    };
    fecthProducts();

    if (name === 'btnEntrega') navigate('/seller/orders');
  };

  return (
    <div
      style={ {
        backgroundColor: '#eaf1ef',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        borderRadius: '20px',
        padding: '10px' } }
    >
      <div
        style={ {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center' } }
      >
        <span data-testid="seller_order_details__element-order-details-label-order-id">
          PEDIDO:
          { sale && formatId() }
        </span>
        <span data-testid="seller_order_details__element-order-details-label-order-date">
          { sale && formatDate() }
        </span>
        <p
          data-testid="seller_order_details__element-order-details-label-delivery-status"
        >
          { sale && sale.status }
        </p>
        <button
          type="button"
          name="btnPrepara"
          data-testid="seller_order_details__button-preparing-check"
          disabled={ (sale && sale.status !== 'Pendente') }
          onClick={ handleBtnStatus }
          className="button_finish_sale"
        >
          PREPARAR PEDIDO
        </button>
        <button
          type="button"
          name="btnEntrega"
          data-testid="seller_order_details__button-dispatch-check"
          disabled={ (sale && sale.status !== 'Preparando') }
          onClick={ handleBtnStatus }
          className="button_finish_sale"
        >
          SAIU PARA ENTREGA
        </button>
      </div>
      <TableCart
        acomuladora={ acomuladora }
        handleChange={ handleChange }
        dataTestId={ dataTestId }
        data={ data }
      />
      <h4>
        Total: R$
        <span data-testid="seller_order_details__element-order-total-price">
          { (totalCart).toFixed(2).replace('.', ',') }
        </span>
      </h4>
    </div>
  );
}

export default SellerOrderDetail;
