import React from "react";
import "./SelectBusinessState.css";
import BackButton from "../../../../components/back-button/BackButtons"; // Suponiendo que ya tienes un BackButton creado
import { useNavigate } from "react-router-dom";

const SelectBusinessState = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/registerBusiness"); // Navegar a la página de registro de negocio
  };

  const handleLoginClick = () => {
    navigate("/validateCodeBusiness");
  };

  const handleReturn = () => {
    navigate("/availableCategories"); // Navegar a la página principal
  };

  return (
    <div className="select-business-state-body">
      <BackButton
        onClick={() => {
          handleReturn();
        }}
      />
      <div className="select-business-state-container">
        <div className="option-card" onClick={handleRegisterClick}>
          Registrar negocio
        </div>
        <div className="option-card" onClick={handleLoginClick}>
          Ingresar negocio
        </div>
      </div>
    </div>
  );
};

export default SelectBusinessState;
