import { Link } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from "react";
import defaultLogo from "../assets/fast-food.png"
import logo from "../assets/logo-white.png"
import placeholder from "../assets/placeholder.png"
import "../styles/Home.scss";
import Footer from "../components/Footer";

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

  console.log(sessionStorage)
  
  function deconnexion(){
    sessionStorage.clear();
    window.location.reload(false);
  }

  return (
    <div id="home">
      {sessionStorage.getItem("token") != null ? <div>Bonjour {sessionStorage.getItem("firstname")} <button type="submit" onClick={deconnexion}>Déconnexion</button></div> : ""}
      <div id="hero">
        <div id="heroLeft">
          <img src={logo} width="400px" />
          <h1>Le portefeuille de cartes de fidélités numérique qui vous facilite la vie&nbsp;!</h1>
          <p>Fidely est un portefeuille de carte de fidélités qui vous permet de toujours avoir sur vous toutes vos cartes. Avec Fidely, les cartes fidélités perdues, c’est finis&nbsp;!</p>
        </div>
        <div id="heroRight">
          <img src={placeholder} width="75%" />
        </div>
      </div>
      <div id="introduction">
        <h2><u>Qui sommes nous ?</u></h2>
        <p class="enTete"><b>Fidely</b> c’est une application mobile à destination des petits et moyens commerces et de leurs clients. Notre volonté : rapprocher commerçants et clients et faciliter la communication. En offrant aux commerçants la possibilité d’être souple et de communiquer activement sur une cible sûre. Pour les clients, nous centralisons toutes les cartes de fidélités dans un seul portefeuille virtuel, pour ne plus jamais perdre ses cartes ou se retrouver avec six fois la même. Oui oui, on connaît 🤪</p>
        <div id="sub">
          <div id="subUser">
            <p><b>En tant que client,</b><br></br>Vous pouvez suivre l’activité de vos commerçes favoris et être alerté dès que ceux-ci proposent une offre, une promotion ou une nouveauté&nbsp;!<br></br>Cumulez vos points de fidélités&nbsp;: que ce soit chez votre coiffeur, votre boulanger, votre maraîcher et vos restaurants préférés. Tout ça en même temps, dans une seule application&nbsp;!<br></br><br></br>Surveillez vos point et obtenez des récompenses sans plus jamais perdre vos cartes papier ou sans en prendre une nouvelle à chaque fois. En plus, pas de date de péremption des points, donc profitez sur la durée de votre fidélité grâce à des systèmes d'avantages personnalisés par vos commerçants favoris&nbsp;!</p>
          <Link to="/subscriptionUser" className="btn btn-primary text-decoration-none text-white">Inscription Client</Link>
          </div>
          <div id="subStore">
            <p><b>En tant que commerçant,</b><br></br>Vous pouvez vous inscrire sur notre plateforme et proposer votre propre système de fidélité avec vos propres récompenses. Personnalisez votre offre de fidélité au maximum. Gagnez en visibilité locale grâce à notre système de mise en avant. Vous pouvez alerter vos clients de vos nouveautés et proposer des promotions directement sur notre application. Vos clients reçevrons des notifications directement sur leurs téléphones.<br></br><br></br>Suivez également votre activité et surveillez ce que votre système de fidélité vous rapporte comme bénéfice. Profitez de nos conseils pour optimiser votre système de fidélité pour attirer un maximum vos clients. Tout ça sans payer quoi que ce soit&nbsp;!</p>
            <Link to="/subscriptionStore" className="btn btn-primary text-decoration-none text-white">Inscription Commerce</Link>
          </div>
          <div className="m-5">
            <Link to="/connexion" className="btn btn-primary text-decoration-none text-white">Connexion</Link>
          </div>
        </div>
      </div>
      <div>
        {stores?.map((store) =>
          <div key={store.name}>
            <img src={defaultLogo} width="20rem" />
            <p>{store.name}</p>
          </div>
        )}
      </div>
      <Footer></Footer>
    </div>
  )
};

export default Home;