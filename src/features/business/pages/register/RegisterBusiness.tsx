import React, { useState } from "react";
import "./RegisterBusiness.css";
import BackButton from "../../../../components/back-button/BackButtons";
import Button from "../../../../components/button/Button";
import { useNavigate } from "react-router-dom";

const RegisterBusiness = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    dni: "",
    businessName: "",
    representative: "",
    category: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Manejo de la lógica de registro
    console.log("Registro completado:", form);
  };

  return (
    <div className="register-business-body">
      <BackButton onClick={() => navigate("/SelectBusinessState")} />
      <div className="register-business-container">
        <h2>Debes completar estos campos para continuar</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            name="dni"
            placeholder="DNI o CEX"
            value={form.dni}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="businessName"
            placeholder="Nombre de negocio"
            value={form.businessName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="representative"
            placeholder="Nombre del representante"
            value={form.representative}
            onChange={handleChange}
            required
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Categoría
            </option>
            <option value="categoria1">Categoría 1</option>
            <option value="categoria2">Categoría 2</option>
            <option value="categoria3">Categoría 3</option>
          </select>
          <Button type="submit" text="Registrar" />
        </form>
      </div>
    </div>
  );
};

export default RegisterBusiness;
