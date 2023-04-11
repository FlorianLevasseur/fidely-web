import { Link } from "react-router-dom";
import logo from "../assets/logo-white.png";
import "../styles/Footer.scss";

function Footer() {
  return (
    <div id="footer" data-testid="footer">
      <Link to="/">
        <img src={logo} alt="logo Fidely" />
      </Link>
      <Link to="/">
        <p>Notre politique de confidentialité</p>
      </Link>
    </div>
  );
}

export default Footer;
