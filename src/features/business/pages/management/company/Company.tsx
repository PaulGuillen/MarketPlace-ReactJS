import React, { useState, useEffect } from "react";
import "./Company.css";
import Navbar from "../../../components/NavBar";
import { fetchUserData, saveStoreData } from "../../../services/Company";
import { observeAuthState } from "../../../../../utils/Utils";

const Company = () => {
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    businessName: "",
    phone: "",
    ruc: "",
    email: "",
    password: "",
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setLogoImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const initializeFormData = async () => {
    try {
      const data = await fetchUserData();
      if (data) {
        setFormData({
          businessName: data.businessName || "",
          phone: data.phone || "",
          ruc: data.ruc || "",
          email: data.email || "",
          password: data.lastPassword || "",
        });
      }
    } catch (error) {
      console.error("Error initializing form data:", error);
    }
  };
  
  const handleSave = async () => {
    try {
      const dataToSave = { ...formData, logoImage };
      const isSuccess = await saveStoreData(dataToSave);
      if (isSuccess) {
        alert("Datos guardados exitosamente en la colección de stores.");
      } else {
        alert("No se pudo guardar los datos. Inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = observeAuthState((user) => {
      if (user) {
        initializeFormData();
      } else {
        console.log("No user is logged in");
      }
    });

    return () => unsubscribe();
  }, []);

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
            <input
              type="text"
              placeholder="Nombre de negocio"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Número de contacto"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="RUC"
              name="ruc"
              value={formData.ruc}
              onChange={handleChange}
            />
          </div>
          <div className="vertical-divider"></div>
          <div className="info-block">
            <h3>Personal</h3>
            <input
              type="email"
              placeholder="Correo"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Contraseña"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="container-button">
          <button className="save-button" onClick={handleSave}>
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default Company;