import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li>
          <Link to="/Company">Negocio</Link>
        </li>
        <li>
          <Link to="/productos">Productos</Link>
        </li>
        <li>
          <Link to="/pedidos">Pedidos</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
