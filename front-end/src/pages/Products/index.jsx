import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestData, setToken } from '../../services/api';
import ProductCard from '../../components/ProductCard';
import LoginContext from '../../context/LoginContext';

function Products() {
  const { setUserLogin, products, setProducts } = useContext(LoginContext);
  const [allProducts, setAllProducts] = useState([]);
  const [reqError, setReqError] = useState(false);
  const navigate = useNavigate();

  const setaContextUser = useCallback(async (name) => {
    const { token, role } = JSON.parse(localStorage.getItem('user'));
    setUserLogin({
      token,
      role,
      name,
    });
  }, [setUserLogin]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const requestProducts = await requestData('/product'); // modificquei o nome da variavel
        setAllProducts(requestProducts);
        // setProducts(allProducts.map((item) => ({
        //   ...item, qt: 0, unitPrice: 0.00, subTotal: 0.00 })));
      } catch (e) {
        console.log(e);
        setReqError(true);
      }
    };
    getProducts();
  }, [allProducts, setProducts]);

  useEffect(() => {
    const verificaToken = async () => {
      try {
        if (localStorage.getItem('logado') === 'true') {
          const { token, role } = JSON.parse(localStorage.getItem('user'));
          setToken(token);
          const { name } = await requestData('/user/validate');

          setaContextUser(name);
          if (role !== 'customer') {
            console.log('quebra de segurança');
            setUserLogin({ token: '', role: '', name: '' });
            navigate('/login');
          }
        } else {
          const { role } = await requestData('/user/validate');
          if (!role) {
            console.log('token invalido');
            navigate('/login');
          }
        }
      } catch (error) {
        console.log('deslogado');
        navigate('/login');
      }
    };
    verificaToken();
  }, [
    navigate,
    setUserLogin,
    setaContextUser,
  ]);

  const handleClickMore = ({ target: { name } }) => {
    const index = products.findIndex(({ id }) => id === Number(name));
    const indexAll = allProducts.findIndex(({ id }) => id === Number(name));
    if (index !== -1) {
      products[index] = {
        id: products[index].id,
        name: products[index].name,
        unitPrice: products[index].unitPrice,
        qt: products[index].qt + 1,
        subTotal: products[index].unitPrice * (products[index].qt + 1),
      };
    } else {
      (
        products.push({
          id: allProducts[indexAll].id,
          name: allProducts[indexAll].name,
          unitPrice: allProducts[indexAll].price,
          qt: 1,
          subTotal: allProducts[indexAll].price,
        })
      );
    }
    // setProducts(products.filter(({ qt }) => qt > 0));
    console.log(products);
  };

  const handleClickMinus = ({ target: { name } }) => {
    const index = products.findIndex(({ id }) => id === Number(name));
    if (index !== -1) {
      products[index] = {
        id: products[index].id,
        name: products[index].name,
        unitPrice: products[index].unitPrice,
        qt: products[index].qt - 1,
        subTotal: products[index].unitPrice * (products[index].qt - 1),
      };
      setProducts(products.filter(({ qt }) => qt > 0));
    }
    console.log(products);
  };

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
              handleClickMore={ handleClickMore }
              handleClickMinus={ handleClickMinus }
            />
          </div>
        )) : <p>{ erro }</p>
      }
    </div>
  );
}

export default Products;
