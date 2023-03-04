import React from 'react';
import PropTypes from 'prop-types';

function ProductCard({ id, name, price, urlImage }) {
  return (
    <div>
      <p data-testid={ `customer_products__element-card-title-${id}` }>
        {name}
      </p>
      <p data-testid={ `customer_products__element-card-price-${id}` }>
        {price}
      </p>
      <img
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ urlImage }
        alt={ name }
      />
      <button
        data-testid={ `customer_products__button-card-rm-item-${id}` }
        type="button"
      >
        -
      </button>
      <input
        type="text"
        data-testid={ `customer_products__input-card-quantity-${id}` }
        // onChange={ (event) => handleChange(event) }
      />
      <button
        data-testid={ `customer_products__button-card-add-item-${id}` }
        type="button"
      >
        +
      </button>
    </div>
  );
}

export default ProductCard;

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  urlImage: PropTypes.string.isRequired,
};
