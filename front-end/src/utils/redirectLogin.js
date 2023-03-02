// import React, { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import LoginContext from '../context/LoginContext';
// import { requestPost, setToken } from '../services/api';

// const RedirectLogin = async (email, password) => {
//   const navigate = useNavigate();
//   const { setUserLogin } = useContext(LoginContext);
//   const { token, role } = await requestPost('/user/login', { email, password });
//   setToken(token);
//   localStorage.setItem('token', token);
//   localStorage.setItem('role', role);
//   setUserLogin({ token, role });
//   // console.log(role);
//   switch (role) {
//   case 'customer':
//     navigate(`/${role}/products`);
//     break;
//   case 'seller':
//     navigate(`/${role}/orders`);
//     break;
//   case 'administrator':
//     navigate('/admin/manage');
//     break;
//   default:
//     break;
//   }

//   return (<div>teste</div>
//   );
//   // setIs
// };

// export default RedirectLogin;
