
import "../../../styles/NavbarHome.css"; 

const NavBarHome = () => {
  return(
    <header className="navbar">
        <div className="navbar-left">
          <button className="menu-button">☰ Menú</button>
          <button className="location-button">📍 Ingresa tu ubicación</button>
        </div>
        <div className="navbar-center">
          <input
            type="text"
            placeholder="Buscar Productos"
            className="search-bar"
          />
        </div>
        <div className="navbar-right">
          <button className="login-button">¡Hola! Inicia sesión</button>
          <button className="cart-button">🛒</button>
        </div>
      </header>
  )
};

export default NavBarHome;
