import { BrowserRouter } from 'react-router-dom';
import Router from './Routes';
import LoginProvider from './context/LoginProvider';
// import RedirectLogin from './utils/redirectLogin';

function App() {
  return (
    <BrowserRouter>
      <LoginProvider>
        <Router />
        {/* <RedirectLogin /> */}
      </LoginProvider>
    </BrowserRouter>
  );
}

export default App;
