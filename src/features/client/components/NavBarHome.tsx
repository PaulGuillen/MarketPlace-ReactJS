import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/store";
import { clearUser } from "../../../store/authSlice";
import { getAuth, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/firebaseConfig"; 
import logoMarket from "../../../assets/logo_market.png";
import favouriteIcon from "../../../assets/icon_favourite.png";
import shoppingIcon from "../../../assets/icon_shopping.png";
import "../../../styles/NavbarHome.css";

const NavBarHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isRegisterSubmenuVisible, setRegisterSubmenuVisible] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const fetchUserRole = async () => {
      if (isAuthenticated && user.uid) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserRole(userData.role);
          }
        } catch (error) {
          console.error("Error fetching user role from Firestore:", error);
        }
      }
    };

    fetchUserRole();
  }, [isAuthenticated, user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <img src={logoMarket} alt="Logo" className="navbar-logo" />
        <span
          onClick={() => console.log("Menú clickeado")}
          className="menu-button"
        >
          ☰ Menú
        </span>
        <span
          onClick={() => console.log("Ubicación clickeada")}
          className="location-button"
        >
          📍 Ingresa tu ubicación
        </span>
      </div>

      <div className="navbar-center">
        <input
          type="text"
          placeholder="Buscar Productos"
          className="search-bar"
        />
      </div>

      <div className="navbar-right">
        <div
          className="user-dropdown"
          onMouseEnter={() => setDropdownVisible(true)}
          onMouseLeave={() => {
            setDropdownVisible(false);
            setRegisterSubmenuVisible(false);
          }}
        >
          <span className="user-greeting">
            {isAuthenticated ? `Hola, ${user.email}` : "Hola, Inicia sesión"}
          </span>
          {isDropdownVisible && (
            <div className="dropdown-menu">
              {isAuthenticated ? (
                <>
                  <span onClick={() => navigate("/mi-cuenta")}>Mi cuenta</span>
                  {userRole === "business" && (
                    <span onClick={() => navigate("/company")}>Negocio</span>
                  )}
                  <span onClick={handleLogout}>Cerrar sesión</span>
                </>
              ) : (
                <>
                  <span onClick={() => navigate("/login")}>Inicia sesión</span>
                  <span
                    onMouseEnter={() => setRegisterSubmenuVisible(true)}
                    onMouseLeave={() => setRegisterSubmenuVisible(false)}
                    className="has-submenu"
                  >
                    Regístrate
                    {isRegisterSubmenuVisible && (
                      <div className="submenu">
                        <span onClick={() => navigate("/registerClient")}>Regístrate como Cliente</span>
                        <span onClick={() => navigate("/registerBusiness")}>Regístrate como Negocio</span>
                      </div>
                    )}
                  </span>
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
