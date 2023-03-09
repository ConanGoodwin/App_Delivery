import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

function TableCart({ acomuladora, handleChange, dataTestId, data }) {
  let total = 0;

  useEffect(() => {
    acomuladora(total);
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
          {
            (dataTestId.btnRemove)
              ? (
                <th>Remover Item</th>
              ) : null
          }

        </tr>
      </thead>
      <tbody>
        { data.map((product, index) => (
          <tr key={ index } className={ (index % 2 !== 0) && 'fundoEscuro' }>
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
                      className="button_remove"
                    >
                      Remover
                    </button>
                  </td>
                ) : null
            }
          </tr>
        ))}
      </tbody>
      { data.forEach(({ subTotal }) => { total += subTotal; }) }
    </table>
  );
}

export default TableCart;

TableCart.propTypes = {
  acomuladora: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    qt: PropTypes.number.isRequired,
    unitPrice: PropTypes.string.isRequired,
    subTotal: PropTypes.number.isRequired,
  })).isRequired,
  dataTestId: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    quantity: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    subTotal: PropTypes.string.isRequired,
    btnRemove: PropTypes.string.isRequired,
  }).isRequired,
};
