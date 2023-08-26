import { Link } from "react-router-dom";

const Public = () => {
  const content = (
    <section>
      <header>
        <h1>Welcome to Path Buddy!</h1>
      </header>
      <main>
        <p>Your one stop shop for crafting and executing your path!</p>
      </main>
      < Link to="/login">
        Login
      </Link>
    </section>
  )

  return content
}

export default Public;