import { Routes, Route } from 'react-router-dom';
import Public from './components/Public';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import Dashboard from './components/authenticated/Dashboard';
import RequireAuth from './features/auth/RequireAuth';

function App() {
  return (
    <Routes>
      {/* the root route ("/") mounts the dashboard
      if a token is present & valid we redirect to /public
      and the user can navigate to /register or /login */}

      {/* protected routes */}
      <Route element={<RequireAuth />}>
        <Route index element={<Dashboard />} />
      </Route>

      {/* public routes */}
      <Route path="public" element={<Public />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>
  );
}

export default App;
