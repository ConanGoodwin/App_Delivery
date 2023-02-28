import { BrowserRouter } from 'react-router-dom';
import Router from './Routes';
import LoginProvider from './context/LoginProvider';

function App() {
  return (
    <BrowserRouter>
        <Router />
    </BrowserRouter>
  );
}

export default App;
