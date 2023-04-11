import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
// import defaultLogo from "../assets/fast-food.png";
import logo from "../assets/logo-white.png";
// import placeholder from "../assets/placeholder.png";
import placeholder from "../assets/Fidely_Mockup_V2-400.png";
import gif from "../assets/Fidely.gif";
import "../styles/Home.scss";
import Footer from "../components/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";

const Home = () => {
  const [stores, setStores] = useState();

  useEffect(() => {
    axios
      .get("https://fidely.herokuapp.com/api/v1/stores")
      .then((response) => {
        setStores(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(stores);

  const span = document.querySelector(".switch-word");
  const words = ["clients", "commerçants"];
  let currentWordIndex = 0;

  function switchWord() {
    span.textContent = words[currentWordIndex];
    currentWordIndex = (currentWordIndex + 1) % words.length;
  }

  setInterval(switchWord, 3500);

  function deconnexion() {
    sessionStorage.clear();
    window.location.reload(false);
  }

  setTimeout(function () {
    var element = document.getElementById("gifAnim");
    element.parentNode.removeChild(element);
  }, 3050);

  return (
    <div id="home">
      {sessionStorage.getItem("token") != null ? (
        <div id="login">
          <p>
            Bonjour <b>{sessionStorage.getItem("firstname")}</b>{" "}
          </p>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={deconnexion}
          >
            Déconnexion
          </button>
        </div>
      ) : (
        ""
      )}
      <div id="hero">
        <img src={gif} alt="Logo animé Fidely" id="gifAnim"></img>
        <div id="heroLeft">
          <img src={logo} width="400px" alt="logo Fidely" />
          <h1>
            L'appli qui vous relie à vos <span class="switch-word"></span>
          </h1>
          <div class="box"></div>
          <p>
            Faites partie de la révolution de la fidélité avec Fidely ! Adoptez
            gratuitement notre portefeuille numérique de cartes de fidélité et
            profitez d'un système de fidélité personnalisé par vos commerces de
            proximité préférés&nbsp;!
          </p>
        </div>
        <div id="heroRight">
          <img src={placeholder} alt="Application Fidely" />
        </div>
      </div>
      <div id="introduction">
        <h2>
          <u>Qui sommes nous ?</u>
        </h2>
        <p className="enTete">
          <b>Fidely</b> est une application mobile destinée aux petits et moyens
          commerces ainsi qu'à leurs clients. Notre objectif : rapprocher les
          commerçants et les clients et faciliter la communication en offrant
          aux commerçants la possibilité de communiquer activement avec une
          cible sûre et flexible. Pour les clients, nous centralisons toutes les
          cartes de fidélité dans un seul portefeuille virtuel, afin qu'ils ne
          perdent plus jamais leurs cartes ou qu'ils n'en aient plus six
          identiques. Oui oui, nous aussi on connaît ça 🤪
        </p>
        <div id="sub">
          <div id="subUser">
            <p>
              <b>En tant que client,</b>
              <br></br>Vous pouvez suivre l'activité de vos commerces favoris et
              être alerté dès qu'ils proposent une offre, une promotion ou une
              nouveauté ! Cumulez vos points de fidélité chez votre coiffeur,
              votre boulanger, votre maraîcher et vos restaurants préférés. Tout
              cela en même temps, dans une seule application !<br></br>
              <br></br>Surveillez vos points et obtenez des récompenses sans
              plus jamais perdre vos cartes papier ou en prendre une nouvelle à
              chaque fois. De plus, il n'y a pas de date d'expiration des
              points, donc profitez de votre fidélité sur la durée grâce à des
              systèmes d'avantages personnalisés par vos commerçants favoris !
            </p>
          </div>
          <div id="subStore">
            <p>
              <b>En tant que commerçant,</b>
              <br></br>Vous pouvez vous inscrire sur notre plateforme et
              proposer votre propre système de fidélité avec vos propres
              récompenses. Personnalisez votre offre de fidélité au maximum.
              Gagnez en visibilité locale grâce à notre système de mise en
              avant. Vous pouvez alerter vos clients de vos nouveautés et
              proposer des promotions directement sur notre application. Vos
              clients recevront des notifications directement sur leurs
              téléphones.
              <br></br>
              <br></br>Suivez également votre activité et surveillez ce que
              votre système de fidélité vous rapporte comme bénéfices. Profitez
              de nos conseils pour optimiser votre système de fidélité et
              attirer un maximum de clients. Tout cela sans payer quoi que ce
              soit !
            </p>
          </div>
        </div>
        <div id="subButtons">
          <Link
            id="subBtn1"
            to="/subscriptionUser"
            className="btn btn-primary text-decoration-none text-white"
          >
            Inscription Client
          </Link>
          <Link
            to="/subscriptionStore"
            className="btn btn-primary text-decoration-none text-white"
          >
            Inscription Commerce
          </Link>
        </div>
        <div id="connexion">
          <p>
            <b>J'ai déjà un compte,</b> je me connecte :
          </p>
          <Link
            to="/connexion"
            className="btn btn-primary text-decoration-none text-white"
          >
            Connexion
          </Link>
        </div>
      </div>
      <div id="partners">
        <Swiper
          grabCursor={true}
          modules={[Autoplay]}
          // spaceBetween={50}
          slidesPerView={4}
          loop={true}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
        >
          {stores?.map((store) => (
            <SwiperSlide key={store.id}>
              <div>
                <img
                  src={require("../assets/" + store.store_type + ".png")}
                  width="20rem"
                  alt={store.store_type}
                />
                <p>{store.name}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Home;
