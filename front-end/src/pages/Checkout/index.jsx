import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import TableCart from '../../components/TableCart';
import LoginContext from '../../context/LoginContext';
import { requestData, requestPost } from '../../services/api';
import verficaToken from '../../utils/auth/verficaToken';

function Checkout() {
  const { userLogin, setUserLogin, cart, setCart } = useContext(LoginContext);
  const [sellers, setSellers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');
  const [drbSeller, setDrbSeller] = useState('');
  const [totalCart, setTotalCart] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const getSellers = async () => {
      try {
        const users = await requestData('/user');
        setSellers(users.filter(({ role }) => role === 'seller'));
        setAllUsers(users);
      } catch (error) { console.log('bad request'); }
    };
    getSellers();
  }, []);

  const setaContextUser = useCallback(async (name) => {
    const { token, role } = JSON.parse(localStorage.getItem('user'));
    setUserLogin({ token, role, name });
  }, [setUserLogin]);

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
  }, [
    navigate,
    setUserLogin,
    setaContextUser,
  ]);

  const handleChange = ({ target: { name } }) => {
    const filter = cart.filter((product) => product.id !== Number(name));
    return setCart(filter);
  };

  const handleClick = async () => {
    let sellerId = '';
    if (!drbSeller) {
      sellerId = sellers[0].id;
    } else {
      sellerId = (sellers.find(({ name }) => name === drbSeller)).id;
    }
    try {
      const userId = (allUsers.find(({ name }) => name === userLogin.name)).id;
      const { id } = await requestPost(
        '/sales/register',
        { userId,
          sellerId,
          totalPrice: totalCart,
          deliveryAddress,
          deliveryNumber,
          saleDate: Date.now(),
          status: 'Pendente' },
      );
      if (id) {
        Promise.all(
          cart.map(async (i) => {
            await requestPost(
              '/salesProducts/register',
              { saleId: id, productId: i.id, quantity: i.qt },
            );
          }),
        );
        setCart([]);
        navigate(`/customer/orders/${id}`);
      }
    } catch (error) { console.log(error); }
  };

  const acomuladora = (value) => {
    if (totalCart !== value) {
      setTotalCart(value);
    }
  };

  const dataTestId = {
    id: 'customer_checkout__element-order-table-item-number',
    name: 'customer_checkout__element-order-table-name',
    quantity: 'customer_checkout__element-order-table-quantity',
    price: 'customer_checkout__element-order-table-unit-price',
    subTotal: 'customer_checkout__element-order-table-sub-total',
    btnRemove: 'customer_checkout__element-order-table-remove',
  };

  return (
    <section style={ { padding: '10px' } }>
      <h4>Finalizar Pedido</h4>
      { (cart.length === 0) ? navigate('/customer/products') : null }
      <TableCart
        acomuladora={ acomuladora }
        handleChange={ handleChange }
        dataTestId={ dataTestId }
      />
      <div style={ { display: 'flex', justifyContent: 'right', width: '100%' } }>
        <h4>
          Total: R$
          <span data-testid="customer_checkout__element-order-total-price">
            { (totalCart).toFixed(2).replace('.', ',') }
          </span>
        </h4>
      </div>
      <div style={ { display: 'flex', justifyContent: 'left', width: '100%' } }>
        <h4>Detalhes e Endereço para Entrega</h4>
      </div>
      <form>
        <div
          style={ { display: 'flex', justifyContent: 'center', width: '100%' } }
        >
          {
            (sellers) ? (
              <label
                htmlFor="cmbSellers"
                className="label"
                style={ { margin: '10px', display: 'flex', flexDirection: 'column' } }
              >
                P. Vendedora Responsável
                <select
                  id="cmbSellers"
                  data-testid="customer_checkout__select-seller"
                  name="dropBSeller"
                  value={ drbSeller }
                  onChange={ ({ target: { value } }) => setDrbSeller(value) }
                  style={ { width: '100%' } }
                >
                  {sellers.map(({ name, id }) => (
                    <option
                      value={ name }
                      name={ id }
                      key={ name }
                    >
                      {name}
                    </option>
                  ))}
                </select>
              </label>
            ) : null
          }
          <label
            htmlFor="txtEndereco"
            className="label"
            style={ { margin: '10px', display: 'flex', flexDirection: 'column' } }
          >
            Endereço
            <input
              type="text"
              id="txtEndereco"
              value={ deliveryAddress }
              onChange={ ({ target: { value } }) => setDeliveryAddress(value) }
              style={ { width: '100%' } }
              data-testid="customer_checkout__input-address"
            />
          </label>
          <label
            htmlFor="txtNumero"
            className="label"
            style={ { margin: '10px', display: 'flex', flexDirection: 'column' } }
          >
            Número
            <input
              type="text"
              id="txtNumero"
              value={ deliveryNumber }
              onChange={ ({ target: { value } }) => setDeliveryNumber(value) }
              style={ { width: '100%' } }
              data-testid="customer_checkout__input-address-number"
            />
          </label>
        </div>
        <button
          type="button"
          data-testid="customer_checkout__button-submit-order"
          onClick={ handleClick }
        >
          FINALIZAR PEDIDO
        </button>
      </form>
    </section>
  );
}
export default Checkout;
