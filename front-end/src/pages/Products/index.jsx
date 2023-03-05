import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestData, setToken } from '../../services/api';
import ProductCard from '../../components/ProductCard';
import LoginContext from '../../context/LoginContext';

const NOT_FOUND = -1;

function Products() {
  const { setUserLogin, cart, setCart } = useContext(LoginContext);
  const [isDisabledButton, setIsDisabledButton] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const [txtQtProduct, setTxtQtProduct] = useState([]);
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
    setIsDisabledButton(Number(cart
      .reduce((acc, curr) => acc + curr.subTotal, 0)) === 0);
    const getProducts = async () => {
      try {
        const products = await requestData('/product');
        setAllProducts(products.map((item) => {
          let qt = 0;

          const index = cart.findIndex(({ id }) => id === item.id);
          if (index !== NOT_FOUND) {
            qt = cart[index].qt;
            setTxtQtProduct((prevsate) => [...prevsate, cart[index].qt]);
          } else {
            setTxtQtProduct((prevsate) => [...prevsate, 0]);
          }
          return { ...item, qt };
        }));
      } catch (e) {
        console.log(e);
        setReqError(true);
      }
    };
    getProducts();
  }, [cart]);

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

  const attAllProducts = (indexAll, operator, value) => {
    const newProduct = {
      id: allProducts[indexAll].id,
      name: allProducts[indexAll].name,
      price: allProducts[indexAll].price,
      urlImage: allProducts[indexAll].urlImage,
    };
    if (operator === '-' && allProducts[indexAll].qt > 0) {
      txtQtProduct[indexAll] = allProducts[indexAll].qt - value;
      setTxtQtProduct((prev) => [...prev]);
      return { ...newProduct, qt: allProducts[indexAll].qt - value };
    }
    if (operator === '-') return allProducts[indexAll];
    txtQtProduct[indexAll] = allProducts[indexAll].qt + value;
    setTxtQtProduct((prev) => [...prev]);
    return { ...newProduct, qt: allProducts[indexAll].qt + value };
  };

  const handleClickMore = ({ target: { name } }, value = 1) => {
    const index = cart.findIndex(({ id }) => id === Number(name));
    const indexAll = allProducts.findIndex(({ id }) => id === Number(name));
    allProducts[indexAll] = attAllProducts(indexAll, '+', value);
    if (index !== NOT_FOUND) {
      cart[index] = {
        id: cart[index].id,
        name: cart[index].name,
        unitPrice: cart[index].unitPrice,
        qt: cart[index].qt + value,
        subTotal: cart[index].unitPrice * (cart[index].qt + value),
      };
    } else {
      (
        cart.push({
          id: allProducts[indexAll].id,
          name: allProducts[indexAll].name,
          unitPrice: allProducts[indexAll].price,
          qt: value,
          subTotal: allProducts[indexAll].price * value,
        })
      );
    }
    setCart(cart.filter(({ qt }) => qt > 0));
    setIsDisabledButton(Number(cart
      .reduce((acc, curr) => acc + curr.subTotal, 0)) === 0);
    console.log(cart);
  };

  const handleClickMinus = ({ target: { name } }, value = 1) => {
    const index = cart.findIndex(({ id }) => id === Number(name));
    const indexAll = allProducts.findIndex(({ id }) => id === Number(name));
    allProducts[indexAll] = attAllProducts(indexAll, '-', value);
    if (index !== NOT_FOUND) {
      cart[index] = {
        id: cart[index].id,
        name: cart[index].name,
        unitPrice: cart[index].unitPrice,
        qt: cart[index].qt - 1,
        subTotal: cart[index].unitPrice * (cart[index].qt - 1),
      };
    }
    setCart(cart.filter(({ qt }) => qt > 0));
    setIsDisabledButton(Number(cart
      .reduce((acc, curr) => acc + curr.subTotal, 0)) === 0);
    console.log(cart);
  };

  const txtChange = ({ target: { value, name } }) => {
    let attValue = Number(value);
    if (Number(value) >= 0) {
      if (!value) attValue = 0;
      console.log(value);
      const index = cart.findIndex(({ id }) => id === Number(name));
      const indexAll = allProducts.findIndex(({ id }) => id === Number(name));
      const att = { target: { name } };
      if (index !== NOT_FOUND) {
        handleClickMore(att, attValue - cart[index].qt);
      } else {
        handleClickMore(att, attValue);
      }
      setAllProducts((prev) => [...prev]);
      txtQtProduct[indexAll] = attValue;
      setTxtQtProduct((prev) => [...prev]);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={ () => navigate('/customer/checkout') }
        data-testid="customer_products__button-cart"
        disabled={ isDisabledButton }
      >
        <span data-testid="customer_products__checkout-bottom-value">
          { Number(cart.reduce((acc, curr) => acc + curr.subTotal, 0))
            .toFixed(2)
            .replace('.', ',') }
        </span>
      </button>
      {
        !reqError ? allProducts.map(({ id, name, price, urlImage }, index) => (
          <div key={ id }>
            <ProductCard
              id={ id }
              name={ name }
              price={ price }
              urlImage={ urlImage }
              quantidade={ txtQtProduct[index] }
              txtChange={ txtChange }
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
