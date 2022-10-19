import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <nav>
        <ul className="list-unstyled">
          <li className="m-5">
            <button className="btn btn-primary"><Link to="/subscriptionCustomer" className="text-decoration-none text-white">Inscription Client</Link></button>
          </li>
          <li className="m-5">
            <button className="btn btn-primary"><Link to="/" className="text-decoration-none text-white">Accueil</Link></button>
          </li>
        </ul>
      </nav>
    </>
  )
};

export default Home;