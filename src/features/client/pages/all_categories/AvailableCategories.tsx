import "./AvailableCategories.css";
import Button from "../../../../components/button/Button";
import BackButton from "../../../../components/back-button/BackButtons";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../../config/firebaseConfig"; // Asegúrate de importar correctamente tu configuración de Firebase

const AvailableCategories = () => {
  const navigate = useNavigate();

  const handleLogoutAndNavigate = async () => {
    try {
      await signOut(auth); // Cerrar sesión en Firebase
      console.log("Sesión cerrada con éxito");
      navigate("/"); // Navegar a la página principal después de cerrar sesión
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const handleBusinessState = () => {
    navigate("/selectBusinessState"); // Navegar a la página de selección de estado del negocio
  }

  return (
    <div className="available-categories-body">
    <BackButton onClick={handleLogoutAndNavigate} />
    <div className="available-categories-container">
      <h1>Selecciona tu categoría</h1>
      <div className="category-buttons">
        <div className="option-card" onClick={() => navigate("/cliente")}>Cliente</div>
        <div className="option-card" onClick={handleBusinessState}>Negocio</div>
      </div>
    </div>
  </div>
  );
};

export default AvailableCategories;
