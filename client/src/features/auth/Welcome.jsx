import { useSelector } from 'react-redux';
import { selectCurrentUser, selectCurrentToken } from './authSlice';

function Welcome() {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);

  const welcome = user ? `Welcome ${user.first_name}!` : 'Welcome!';

  const content = (
    <section className="welcome">
      <h1>{welcome}</h1>
      <p>
        Token:
        {token}
      </p>
    </section>
  );

  return content;
}
export default Welcome;
