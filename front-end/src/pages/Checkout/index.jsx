import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginContext from '../../context/LoginContext';
import { requestData } from '../../services/api';
import verficaToken from '../../utils/auth/verficaToken';

function Checkout() {
  const { setUserLogin, cart, setCart } = useContext(LoginContext);
  const [sellers, setSellers] = useState('');
  const [statusForm, setStatusForm] = useState({
    idSeller: '',
    drbSeller: '',
    txtEndereco: '',
    txtNumero: '',
  });
  const navigate = useNavigate();
  let total = 0;

  useEffect(() => {
    const getSellers = async () => {
      try {
        const users = await requestData('/user');
        setSellers(users.filter(({ role }) => role === 'seller'));
      } catch (error) {
        console.log('bad request');
      }
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

  const handleChange = ({ target: { name, value } }) => {
    const filter = cart.filter((product) => product.id !== Number(name));
    switch (name) {
    case 'dropBSeller':
      return setStatusForm((prev) => ({ ...prev, drbSeller: value }));
    case 'txtEndereco':
      return setStatusForm((prev) => ({ ...prev, txtEndereco: value }));
    case 'txtNumero':
      return setStatusForm((prev) => ({ ...prev, txtNumero: value }));
    default:
      return setCart(filter);
    }
  };

  const handleClick = () => {
  };

  return (
    <section>
      <div style={ { display: 'flex', justifyContent: 'left', width: '100%' } }>
        <h4>Finalizar Pedido</h4>
      </div>
      <table width="100%">
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
        <tbody>
          { cart.map((product, index) => (
            <tr key={ index }>
              <td
                data-testid={
                  `customer_checkout__element-order-table-item-number-${index}`
                }
              >
                {index + 1}
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-name-${index}`
                }
              >
                {product.name}
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-quantity-${index}`
                }
              >
                {product.qt}
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-unit-price-${index}`
                }
              >
                {parseFloat(product.unitPrice).toFixed(2).replace('.', ',')}
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-sub-total-${index}`
                }
              >
                {parseFloat(product.subTotal).toFixed(2).replace('.', ',')}
              </td>
              <td>
                <button
                  name={ product.id }
                  data-testid={
                    `customer_checkout__element-order-table-remove-${index}`
                  }
                  type="button"
                  onClick={ (target) => handleChange(target) }
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
          { cart.forEach(({ subTotal }) => { total += subTotal; })}
        </tbody>
      </table>
      <div style={ { display: 'flex', justifyContent: 'right', width: '100%' } }>
        <h4>
          Total: R$
          {' '}
          <span data-testid="customer_checkout__element-order-total-price">
            { (total).toFixed(2).replace('.', ',') }
          </span>
        </h4>
      </div>
      <div style={ { display: 'flex', justifyContent: 'left', width: '100%' } }>
        <h4>Detalhes e Endereço para Entrega</h4>
      </div>
      <form>
        <div
          style={ { display: 'flex',
            justifyContent: 'center',
            width: '100%' } }
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
                  value={ statusForm.drbSeller }
                  onChange={ handleChange }
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
              name="txtEndereco"
              value={ statusForm.txtEndereco }
              onChange={ handleChange }
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
              name="txtNumero"
              value={ statusForm.txtNumero }
              onChange={ handleChange }
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
