import { useNavigate } from "react-router-dom";
import "../../../styles/NavbarHome.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import logoMarket from "../../../assets/logo_market.png";
import favouriteIcon from "../../../assets/icon_favourite.png";
import shoppingIcon from "../../../assets/icon_shopping.png";
import { useState } from "react";

const NavBarHome = () => {
  const navigate = useNavigate();
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const handleLoginClick = () => {
    navigate("/clientLogin");
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <img src={logoMarket} alt="Logo" className="navbar-logo" />
        <span onClick={() => console.log("Menú clickeado")} className="menu-button">
          ☰ Menú
        </span>
        <span onClick={() => console.log("Ubicación clickeada")} className="location-button">
          📍 Ingresa tu ubicación
        </span>
      </div>

      <div className="navbar-center">
        <input type="text" placeholder="Buscar Productos" className="search-bar" />
      </div>

      <div className="navbar-right">
        <div
          className="user-dropdown"
          onMouseEnter={() => setDropdownVisible(true)}
          onMouseLeave={() => setDropdownVisible(false)}
        >
          <span className="user-greeting">
            {isAuthenticated ? `Hola, ${user.email}` : "Hola, Inicia sesión"}
          </span>
          {isDropdownVisible && (
            <div className="dropdown-menu">
              {isAuthenticated ? (
                <span onClick={() => navigate("/accountSettings")}>Mi cuenta</span>
              ) : (
                <>
                  <span onClick={handleLoginClick}>Inicia sesión</span>
                  <span onClick={() => navigate("/register")}>Regístrate</span>
                </>
              )}
            </div>
          )}
        </div>

        <span className="favourite-button icon">
          <img src={favouriteIcon} alt="Favorite" />
        </span>
        <span className="shopping-button icon">
          <img src={shoppingIcon} alt="Shopping" />
        </span>
      </div>
    </header>
  );
};

export default NavBarHome;
