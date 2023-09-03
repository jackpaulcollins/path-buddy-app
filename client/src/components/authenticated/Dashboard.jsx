import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentToken, selectCurrentUser } from '../../features/auth/authSlice';
import Navbar from './Navbar';
import NewPath from './paths/NewPath';

function Welcome() {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);

  const welcomeMessage = user ? `Welcome ${user.first_name}!` : 'Welcome!';

  const content = (
    <div>
      <Navbar />
      <section className="welcome">
        <h1>{welcomeMessage}</h1>
        <p>
          Token:
          {token}
        </p>
      </section>
      <Routes>
        <Route path="/new-path" element={<NewPath />} />
      </Routes>
    </div>
  );

  return content;
}
export default Welcome;
