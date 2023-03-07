import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import LoginContext from '../context/LoginContext';

function TableCart({ acomuladora, handleChange, dataTestId }) {
  const { cart } = useContext(LoginContext);
  let total = 0;

  useEffect(() => {
    acomuladora(total);
    // setRefresh((prev) => prev + 1);
    // console.log(`total: ${total}`);
  }, [acomuladora, total]);

  return (
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
                `${dataTestId.id}-${index}`
              }
            >
              {index + 1}
            </td>
            <td
              data-testid={
                `${dataTestId.name}-${index}`
              }
            >
              {product.name}
            </td>
            <td
              data-testid={
                `${dataTestId.quantity}-${index}`
              }
            >
              {product.qt}
            </td>
            <td
              data-testid={
                `${dataTestId.price}-${index}`
              }
            >
              {parseFloat(product.unitPrice).toFixed(2).replace('.', ',')}
            </td>
            <td
              data-testid={
                `${dataTestId.subTotal}-${index}`
              }
            >
              {parseFloat(product.subTotal).toFixed(2).replace('.', ',')}
            </td>
            {
              (dataTestId.btnRemove)
                ? (
                  <td>
                    <button
                      name={ product.id }
                      data-testid={
                        `${dataTestId.btnRemove}-${index}`
                      }
                      type="button"
                      onClick={ (target) => handleChange(target) }
                    >
                      Remover
                    </button>
                  </td>
                ) : null
            }
          </tr>
        ))}
      </tbody>
      { cart.forEach(({ subTotal }) => { total += subTotal; }) }
    </table>
  );
}

export default TableCart;

TableCart.propTypes = {
  acomuladora: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  dataTestId: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    quantity: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    subTotal: PropTypes.string.isRequired,
    btnRemove: PropTypes.string.isRequired,
  }).isRequired,
};
