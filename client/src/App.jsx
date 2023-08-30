import { Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Public from './components/Public';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import Dashboard from './components/authenticated/Dashboard';
import RequireAuth from './features/auth/RequireAuth';

function App() {
  return (
    <GoogleOAuthProvider
      clientId="783783941258-m7cc9mb9rodak6hmsmlnv7kr0471tn5v.apps.googleusercontent.com"
    >
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
    </GoogleOAuthProvider>
  );
}

export default App;
