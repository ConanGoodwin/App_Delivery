import React, { useContext } from 'react';
import LoginContext from '../../context/LoginContext';

const BORDER = '1px solid black';

function Checkout() {
  const { userLogin } = useContext(LoginContext);
  console.log(userLogin);

  return (
    <div style={ { display: 'flex', width: '100%', border: BORDER } }>
      teste
    </div>
  );
}

export default Checkout;
