import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestData, setToken } from '../../services/api';
import ProductCard from '../../components/ProductCard';
import LoginContext from '../../context/LoginContext';

function Products() {
  const { setUserLogin } = useContext(LoginContext);
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
        const products = await requestData('/product');
        setAllProducts(products);
      } catch (e) {
        console.log(e);
        setReqError(true);
      }
    };
    getProducts();
  }, []);

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
