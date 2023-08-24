import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login'
import Register from './features/auth/Register'
import Welcome from './features/auth/Welcome'
import RequireAuth from './features/auth/RequireAuth'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="welcome" element={<Welcome />} />
        </Route>

      </Route>
    </Routes>
  )
}

export default App;