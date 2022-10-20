import { Link } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from "react";
import defaultLogo from "../assets/fast-food.png"

const Home = () => {
  const [stores, setStores] = useState();

  useEffect(() => {
    axios.get('http://localhost:4000/stores')
      .then(response => {
        setStores(response.data)
      })
      .catch(err => {
        console.log(err)
      });
  }, []);

  console.log(stores)
    
  return (
    <div>
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
      <div>
        {stores?.map((store) =>
          <div key={store.name}>
            <img src={defaultLogo} width="20rem" />
            <p>{store.name}</p>
          </div>
        )}
      </div>
    </div>
  )
};

export default Home;