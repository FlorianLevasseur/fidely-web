import { Link } from "react-router-dom";
import logo from "../assets/Fidely.png"

function Navbar(){
    return (
        <div>
            <Link to="/"><img src={logo} alt="logo Fidely" width="10%" /></Link>
        </div>
    )
    
}

export default Navbar