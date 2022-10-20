import { Link } from "react-router-dom";

const Home = () => {
  return (
      <nav>
        <ul className="list-unstyled">
          <li className="m-5">
            <Link to="/subscriptionUser" className="btn btn-primary text-decoration-none text-white">Inscription Client</Link>
          </li>
          <li className="m-5">
            <Link to="/subscriptionStore" className="btn btn-primary text-decoration-none text-white">Inscription Commerce</Link>
          </li>
        </ul>
      </nav>
  )
};

export default Home;