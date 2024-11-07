import { Link } from "react-router-dom";
import "../../../styles/business/NavbarBusiness.css";
import homeIcon from "../../../assets/icon_home.png"; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li>
          <Link to="/company">Negocio</Link>
        </li>
        <li>
          <Link to="/products-business">Productos</Link>
        </li>
        <li>
          <Link to="/orders-business">Pedidos</Link>
        </li>
      </ul>
      <div className="navbar-home-icon">
        <Link to="/home">
          <img src={homeIcon} alt="Home" className="home-icon" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
