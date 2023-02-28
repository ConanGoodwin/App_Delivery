import React, { useContext } from 'react';
// import api from '../../services/api';
import LoginContext from '../../context/LoginContext';

function Login() {
  const context = useContext(LoginContext);
  console.log(context);
  // const [user, setUser] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  // const loginClick = async () => {
  //   // api.defaults.headers.authorization = 'teste';
  //   api
  //     .post('/user/login', {
  //       email: 'adm@deliveryapp.com',
  //       password: '--adm2@21!!--',
  //     })
  //     .then((response) => setUser(response.data))
  //     .catch((err) => {
  //       setUser('');
  //       console.error(`ops! ocorreu um erro${err}`);
  //     });
  //   console.log(user.token);
  // };
  // const loginTestId = 'common_login';

  return (
    <div>
      <form>
        <label htmlFor="email-input">
          <input
            className="login__login_input"
            type="text"
            // value={ email }
            // onChange={ ({ target: { value } }) => setEmail(value) }
            data-testid="login__login_input"
            placeholder="Login"
          />
        </label>
        <label htmlFor="password-input">
          <input
            type="password"
            // value={ password }
            // onChange={ ({ target: { value } }) => setPassword(value) }
            data-testid="login__password_input"
            placeholder="Senha"
          />
        </label>
        <button
          type="submit"
        >
          LOGIN
        </button>
        <button
          type="button"
          // onClick = {() => <Navigate to="/register" /> }

        >
          Ainda não tenho conta
        </button>
      </form>
    </div>
  );
}

export default Login;
