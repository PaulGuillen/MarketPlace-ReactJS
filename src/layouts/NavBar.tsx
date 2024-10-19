import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"; 

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
    </nav>
  );
};

export default Navbar;
