import logo from './logo.svg';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './auth/authSlice';

function App() {
  const currentUser = useSelector((state) => state.auth.currentUser )

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          { currentUser }
        </p>
      </header>
    </div>
  );
}

export default App;
