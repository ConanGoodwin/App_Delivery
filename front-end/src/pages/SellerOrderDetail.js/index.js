import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TableCart from '../../components/TableCart';
import { requestData } from '../../services/api';

function SellerOrderDetail() {
  const [totalCart, setTotalCart] = useState(0);
  // const [products, setProducts] = useState([]);
  // const [saleProducts, setSaleProducts] = useState([]);
  const [data, setData] = useState([]);
  const { id } = useParams();
  const dataTestId = {
    id: 'customer_checkout__element-order-table-item-number',
    name: 'customer_checkout__element-order-table-name',
    quantity: 'customer_checkout__element-order-table-quantity',
    price: 'customer_checkout__element-order-table-unit-price',
    subTotal: 'customer_checkout__element-order-table-sub-total',
    btnRemove: '',
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const allSaleProducts = await requestData(`/salesProducts/${id}`);
        const allProducts = await requestData('/product');
        const formatSaleProject = allSaleProducts.map((item) => {
          const prod = allProducts.find((produc) => produc.id === item.productId);
          return {
            name: prod.name,
            qt: item.quantity,
            subTotal: prod.price * item.quantity,
            unitPrice: prod.price,
          };
        });
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

  return (
    <div>
      teste
      <TableCart
        acomuladora={ acomuladora }
        // handleChange={ handleChange }
        dataTestId={ dataTestId }
        data={ data }
      />
    </div>
  );
}

export default SellerOrderDetail;
