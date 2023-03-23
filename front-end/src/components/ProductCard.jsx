import React from 'react';
import PropTypes from 'prop-types';

function ProductCard({
  id, name, price, urlImage, quantidade, txtChange, handleClickMore, handleClickMinus }) {
  const src = `${
    process.env.API_URL || 'http://localhost:3001'
  }/images/`;

  return (
    <section>
      <p
        data-testid={ `customer_products__element-card-title-${id}` }
        className="fontLarger"
      >
        {name}
      </p>
      <p>{ `${src + urlImage}teste` }</p>
      <p data-testid={ `customer_products__element-card-price-${id}` }>
        R$
        {' '}
        {(price).replace('.', ',')}
      </p>
      <img
        className="img_product"
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ src + urlImage }
        alt={ name }
      />
      <div className="divBtn">
        <button
          className="button"
          data-testid={ `customer_products__button-card-rm-item-${id}` }
          type="button"
          name={ id }
          onClick={ handleClickMinus }
        >
          -
        </button>
        <input
          className="imput_qt_product"
          type="text"
          data-testid={ `customer_products__input-card-quantity-${id}` }
          name={ id }
          value={ quantidade }
          onChange={ txtChange }
        />
        <button
          className="button"
          data-testid={ `customer_products__button-card-add-item-${id}` }
          type="button"
          name={ id }
          onClick={ handleClickMore }
        >
          +
        </button>
      </div>
    </section>
  );
}

export default ProductCard;

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  urlImage: PropTypes.string.isRequired,
  quantidade: PropTypes.number.isRequired,
  txtChange: PropTypes.func.isRequired,
  handleClickMore: PropTypes.func.isRequired,
  handleClickMinus: PropTypes.func.isRequired,
};
