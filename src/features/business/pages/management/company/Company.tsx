import React, { useState } from "react";
import "./Company.css";
import Navbar from "../../../../../layouts/NavBar";

const Company = () => {
  const [logoImage, setLogoImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setLogoImage(imageUrl);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="company-body">
        <div className="card logo-section">
          <div className="logo-upload">
            {logoImage ? (
              <img
                src={logoImage}
                alt="Logo preview"
                className="logo-preview"
              />
            ) : (
              <p>No logo selected</p>
            )}
            <input
              type="file"
              id="logo-upload-input"
              onChange={handleImageUpload}
            />
            <label htmlFor="logo-upload-input" className="upload-icon">
              📤 Tamaño del logo
            </label>
          </div>
        </div>

        <div className="card information-section">
          <div className="info-block">
            <h3>Para cliente</h3>
            <input type="text" placeholder="Nombre de negocio" />
            <input type="text" placeholder="Número de contacto" />
            <input type="text" placeholder="RUC" />
          </div>
          <div className="vertical-divider"></div>
          <div className="info-block">
            <h3>Personal</h3>
            <input type="email" placeholder="Correo" />
            <input type="password" placeholder="Contraseña" />
          </div>
        </div>

        <div className="container-button">
        <button className="save-button">Guardar cambios</button>
        </div>
      </div>
    </div>
  );
};

export default Company;
