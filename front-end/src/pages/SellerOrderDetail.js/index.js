import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TableCart from '../../components/TableCart';
import { requestData } from '../../services/api';

function handleChange() {
  console.log('oi');
}

const NUMBER_ONE = 1;
const NUMBER_TWO = 2;
const NUMBER_TREE = 3;

function SellerOrderDetail() {
  const [totalCart, setTotalCart] = useState(0);
  const [sale, setSale] = useState({});
  const [data, setData] = useState([]);
  const { id } = useParams();
  const dataTestId = {
    id: 'seller_order_details__element-order-table-item-number',
    name: 'seller_order_details__element-order-table-name',
    quantity: 'seller_order_details__element-order-table-quantity',
    price: 'seller_order_details__element-order-table-unit-price',
    subTotal: 'seller_order_details__element-order-table-sub-total',
    btnRemove: '',
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const allSaleProducts = await requestData(`/salesProducts/${id}`);
        const allProducts = await requestData('/product');
        const allSales = await requestData('/sales');
        const formatSaleProject = allSaleProducts.map((item) => {
          const prod = allProducts.find((produc) => produc.id === item.productId);
          return {
            name: prod.name,
            qt: item.quantity,
            subTotal: prod.price * item.quantity,
            unitPrice: prod.price,
          };
        });
        setSale(allSales.find((item) => item.id === Number(id)));
        setData(formatSaleProject);
      } catch (error) {
        console.log('bad request');
      }
    };
    getData();
  }, [id]);

  const acomuladora = (value) => {
    if (totalCart !== value) {
      setTotalCart(value);
    }
  };

  const formatId = () => {
    if (id) {
      switch (id.length) {
      case NUMBER_ONE:
        return ` 000${id}`;
      case NUMBER_TWO:
        return ` 00${id}`;
      case NUMBER_TREE:
        return ` 0${id}`;
      default:
        return ` ${id}`;
      }
    }
  };

  return (
    <div>
      <div>
        PEDIDO:
        <span data-testid="seller_order_details__element-order-details-label-order-id">
          { sale && formatId() }
        </span>
      </div>
      {/* { console.log(sale) } */}
      <TableCart
        acomuladora={ acomuladora }
        handleChange={ handleChange }
        dataTestId={ dataTestId }
        data={ data }
      />
    </div>
  );
}

export default SellerOrderDetail;
