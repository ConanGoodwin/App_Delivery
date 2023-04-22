import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestData } from '../../services/api';
import ProductCard from '../../components/ProductCard';
import LoginContext from '../../context/LoginContext';
import verficaToken from '../../utils/auth/verficaToken';

const NOT_FOUND = -1;

function Products() {
  const { setUserLogin, cart, setCart } = useContext(LoginContext);
  const [isDisabledButton, setIsDisabledButton] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const [txtQtProduct, setTxtQtProduct] = useState([]);
  const [reqError, setReqError] = useState(false);
  const navigate = useNavigate();

  // recupera os dados de usuario do local storage e preenche a variavel global user com eles
  const setaContextUser = useCallback(async ({ name }) => {
    const { token, role } = JSON.parse(localStorage.getItem('user'));
    // if (JSON.parse(localStorage.getItem('cart'))) {
    //   setCart(JSON.parse(localStorage.getItem('cart')));
    //   setTxtQtProduct((prev) => [...prev]);
    //   console.log(cart);
    // }
    setUserLogin({
      token,
      role,
      name,
    });
  }, [setUserLogin]);

  // faz a validação do token e verifica a role do usuario logado para validar se
  // aquele tipo de usuario tem acesso aquela pagina.
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
  }, [navigate, setUserLogin, setaContextUser]);

  // busca a lista de produtos no banco e preenche o estado allProducts com esta lista.
  // esta funão vai acionada sempre que entrar na pagina
  useEffect(() => {
    setIsDisabledButton(Number(cart
      .reduce((acc, curr) => acc + curr.subTotal, 0)) === 0); // desabilita o botão se o valor da soma dos subtotais for zero, abilita se não for
    const getProducts = async () => {
      try {
        const products = await requestData('/product');
        // acresenta o campo qt com, zero quando o produto não esta no carrinho,
        // ou o valor de qt quando o produto esta no carrinho
        setAllProducts(products.map((item) => {
          let qt = 0;

          const index = cart.findIndex(({ id }) => id === item.id); // busca o indice do produto no carrinho, -1 se não encontrar
          if (index !== NOT_FOUND) {
            qt = cart[index].qt; // o valor de qt do produto no carrinho
            setTxtQtProduct((prevsate) => [...prevsate, cart[index].qt]); // o valor de qt do carrinho nas caixas de texto
          } else {
            setTxtQtProduct((prevsate) => [...prevsate, 0]); // zera o valor das caixas de texto
          }
          return { ...item, qt };
        }));
      } catch (e) {
        console.log(e);
        setReqError(true); // deixa visivel menssagem de erro em caso de falha na conexão com o banco de dados
      }
    };
    getProducts();
  }, [cart]);

  // atualiza qt em allProducts, do produto especificado(atavés de indexAll),
  // diminuindo ou aumentando(de acordo com operator),
  // na medida de value(1 quando acionado através dos botões + e -, valor da caixa de texto quando alterado por lá)
  // atualiza tambem o estado txtQtProduct para sincronizar a caixa de texto com o qt de allProduct do produto especificado.
  const attAllProducts = (indexAll, operator, value) => {
    const newProduct = {
      id: allProducts[indexAll].id,
      name: allProducts[indexAll].name,
      price: allProducts[indexAll].price,
      urlImage: allProducts[indexAll].urlImage,
    }; // cria um produto atualizado provisório igual ao produto especificado, sem o campo qt

    if (operator === '-' && allProducts[indexAll].qt > 0) {
      txtQtProduct[indexAll] = allProducts[indexAll].qt - value;
      setTxtQtProduct((prev) => [...prev]); // atualiza a caixa de texto do produto especificado com o novo valor de qt
      return { ...newProduct, qt: allProducts[indexAll].qt - value };
    } // se o operador for - e qt for maior que zero, retorna um produto atualizado provisório com o campo qt, menos value

    if (operator === '-') return allProducts[indexAll]; // retorna o proprio produto especificado, sem atualizar, no caso de operador - e qt igual a 0

    txtQtProduct[indexAll] = allProducts[indexAll].qt + value;
    setTxtQtProduct((prev) => [...prev]); // atualiza a caixa de texto do produto especificado com o novo valor de qt
    return { ...newProduct, qt: allProducts[indexAll].qt + value };
    // por fim, o operador só pode ser +, retorna um produto atualizado provisório com o campo qt, mais value
  };

  // acionado quando o botão + é pressionado(sem passar o parametro value, que assume o default 1)
  // acionado quando o texto da caixa de texto de um produto em especifico é alterado.
  // atualiza qt do produto especificado no carrinho(se ele ainda não estiver no carrinho, coloca)
  // atualiza qt do produto especificado em allProduct atraves da função attAllProducts
  const handleClickMore = ({ target: { name } }, value = 1) => {
    const index = cart.findIndex(({ id }) => id === Number(name)); // busca o indice no array carrinho do produto especificado
    const indexAll = allProducts.findIndex(({ id }) => id === Number(name)); // busca o indice no array allProducts do produto especificado

    allProducts[indexAll] = attAllProducts(indexAll, '+', value); // atualiza em value allProducts e a caixa de texto do produto especificado.
    if (index !== NOT_FOUND) {
      cart[index] = {
        id: cart[index].id,
        name: cart[index].name,
        unitPrice: cart[index].unitPrice,
        qt: cart[index].qt + value,
        subTotal: cart[index].unitPrice * (cart[index].qt + value),
      }; // caso ache o produto no carrinho, atualiza em mais value o qt do carrinho, e calcula o subtotal
    } else {
      (
        cart.push({
          id: allProducts[indexAll].id,
          name: allProducts[indexAll].name,
          unitPrice: allProducts[indexAll].price,
          qt: value,
          subTotal: allProducts[indexAll].price * value,
        })
      ); // caso não ache o produto no carrinho, cria um novo com os valores contidos em allProducts, usando value de base para qt e subtotal
    }
    setCart(cart.filter(({ qt }) => qt > 0)); // retira do carrinho produtos de qt = 0. no caso do +qt, tem de estar aqui para atualizar a pagina.
    setIsDisabledButton(Number(cart
      .reduce((acc, curr) => acc + curr.subTotal, 0)) === 0); // desabilita o botão se o valor da dsoma dos subtotais for zero, abilita se não for
    console.log(cart);
  };

  const handleClickMinus = ({ target: { name } }, value = 1) => {
    const index = cart.findIndex(({ id }) => id === Number(name)); // busca o indice no array carrinho do produto especificado
    const indexAll = allProducts.findIndex(({ id }) => id === Number(name)); // busca o indice no array allProducts do produto especificado
    allProducts[indexAll] = attAllProducts(indexAll, '-', value); // atualiza em value allProducts e a caixa de texto do produto especificado.
    if (index !== NOT_FOUND) {
      cart[index] = {
        id: cart[index].id,
        name: cart[index].name,
        unitPrice: cart[index].unitPrice,
        qt: cart[index].qt - value,
        subTotal: cart[index].unitPrice * (cart[index].qt - value),
      };
    } // caso ache o produto no carrinho, atualiza em menos value o qt do carrinho, e calcula o subtotal
    setCart(cart.filter(({ qt }) => qt > 0)); // retira do carrinho produtos de qt = 0
    setIsDisabledButton(Number(cart
      .reduce((acc, curr) => acc + curr.subTotal, 0)) === 0);
    console.log(cart);
  };

  // verifica o que foi digitado na caixa de texto do card e mantem no estado
  const txtChange = ({ target: { value, name } }) => {
    let attValue = Number(value); // captura o texto da caixa de texto transforma em number
    if (Number(value) >= 0) { // verifica se o texto é não negativo e não numero
      if (!value) attValue = 0; // se o texto for vazio transforma o valor em zero
      const index = cart.findIndex(({ id }) => id === Number(name)); // busca o indice no array carrinho do produto especificado
      const indexAll = allProducts.findIndex(({ id }) => id === Number(name)); // busca o indice no array allProducts do produto especificado
      const att = { target: { name } }; // coloca no target: { name } o id da caixa de texto que será tambem o id d produto especificado
      if (index !== NOT_FOUND) {
        handleClickMore(att, attValue - cart[index].qt);
      } else {
        handleClickMore(att, attValue);
      }
      // se achou o produto no carrinho, atualiza o estado da caixa de texto menos o valor do carrinho(este valor do carrinho já vai ser somado na função handleClickMore)
      // atualiza qt do carrinho(e em allProducts) com o estado da caixa de texto(value em handleClickMore assume attValue)
      // se não achou(index = -1), atualiza qt do carrino(e em allProducts) criando um produto, e atualiza estado da caixa de texto
      setAllProducts((prev) => [...prev]); // confirma a atualização em allProducts, para evitar delay
      txtQtProduct[indexAll] = attValue; // atualiza o estado da caixa de texto do produto especificado com o valor digitado na caixa de texto
      setTxtQtProduct((prev) => [...prev]); // confirma a atualização no estado da caixa de texto para evitar delay, para evitar delay
    }
  };

  const handleClickBtnCart = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/customer/checkout');
  };

  return (
    <main>
      <button
        className="button_checkout"
        type="button"
        onClick={ handleClickBtnCart }
        data-testid="customer_products__button-cart"
        disabled={ isDisabledButton }
      >
        R$
        {' '}
        <span
          style={ { fontSize: 'xx-large' } }
          data-testid="customer_products__checkout-bottom-value"
        >
          { Number(cart.reduce((acc, curr) => acc + curr.subTotal, 0))
            .toFixed(2)
            .replace('.', ',') }
        </span>
        <img
          src={
            // add railway envs
            // eslint-disable-next-line max-len
            `${process.env.REACT_APP_API_URL}/images/shopping_cart_market_ecommerce_icon_144576.png`
          }
          alt=""
        />
      </button>
      {
        !reqError ? allProducts.map(({ id, name, price, urlImage }, index) => (
          <div key={ id } style={ { flexBasis: '50px' } }>
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
    </main>
  );
}

export default Products;
