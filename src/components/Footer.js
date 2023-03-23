import { Link } from "react-router-dom";
import logo from "../assets/logo-white.png"
import "../styles/Footer.scss"

function Footer(){
    return (
        <div id="footer" data-testid="footer">
            <Link to="/"><img src={logo} alt="logo Fidely" width="10%" /></Link>
            <p>Notre politique de confidentialité</p>
        </div>
    )
}

export default Footer