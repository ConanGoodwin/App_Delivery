import { BrowserRouter } from 'react-router-dom';
import { useContext } from 'react';
import Router from './Routes';
import NavBar from './components/NavBar';
import LoginContext from './context/LoginContext';
// import './components/style.css';

function App() {
  const { userLogin } = useContext(LoginContext);

  return (
    <BrowserRouter>
      { (userLogin.role) ? <NavBar /> : null }
      <Router />
    </BrowserRouter>
  );
}

export default App;
