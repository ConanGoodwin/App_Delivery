import { BrowserRouter } from 'react-router-dom';
import { useContext } from 'react';
import Router from './Routes';
import NavBar from './components/NavBar';
import LoginContext from './context/LoginContext';

function App() {
  const { userLogin } = useContext(LoginContext);
  const src = `${
    process.env.API_URL || 'http://localhost:3001'
  }/images/background3.png`;

  return (
    <BrowserRouter>
      {userLogin.role ? <NavBar /> : null}
      <div className="main">
        <img src={ src } alt="sem" className="fundo_main" />
        <Router />
      </div>
    </BrowserRouter>
  );
}

export default App;
