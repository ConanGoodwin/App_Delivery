import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestData } from '../../services/api';
import ProductCard from '../../components/ProductCard';

function Products() {
  const [allProducts, setAllProducts] = useState([]);
  const [reqError, setReqError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const products = await requestData('/product');
        setAllProducts(products);
      } catch (e) {
        console.log(e);
        setReqError(true);
      }
    };
    getProducts();
  }, []);
  return (
    <div>
      <button
        type="button"
        onClick={ () => navigate('/custumer/checkout') }
      >
        Ver Carrinho
      </button>
      {
        !reqError ? allProducts.map(({ id, name, price, urlImage }) => (
          <div key={ id }>
            <ProductCard
              id={ id }
              name={ name }
              price={ price }
              urlImage={ urlImage }
            />
          </div>
        )) : <p>{ erro }</p>
      }
    </div>
  );
}

export default Products;
