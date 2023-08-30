import { useSelector } from 'react-redux';
import { selectCurrentToken, selectCurrentUser } from '../../features/auth/authSlice';
import Navbar from './Navbar';

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
    </div>
  );

  return content;
}
export default Welcome;
