import "../../../../../styles/auth/business/RegisterBusiness.css";
import { FaGoogle } from "react-icons/fa";
import tiendaOnline from "../../../../../assets/tienda-online.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  checkDniExists,
  registerBusinessData,
  getUserData,
  getCurrentUser,
  prepareBusinessData,
} from "../../../services/RegisterBusiness";

const RegisterBusiness = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    document: "",
    phone: "",
    email: "",
    password: "",
    businessName: "",
    representative: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden.");
      return;
    }

    setErrorMessage("");
    const user = getCurrentUser();

    if (user) {
      try {
        const dniExists = await checkDniExists(form.document);
        if (dniExists) {
          setErrorMessage("Este DNI ya está registrado.");
          return;
        }

        const userData = await getUserData(user.uid);
        if (userData) {
          const businessData = prepareBusinessData(user.uid, form);

          await registerBusinessData(user.uid, businessData);
          console.log("Negocio registrado con éxito:", businessData);

          navigate("/company");
        } else {
          setErrorMessage("No se encontraron datos para este usuario en Firestore.");
        }
      } catch (error) {
        console.error("Error al registrar el negocio:", error);
        setErrorMessage("Ocurrió un error al registrar el negocio. Inténtalo de nuevo.");
      }
    } else {
      console.log("No hay usuario autenticado.");
      setErrorMessage("No hay un usuario autenticado.");
    }
  };

  return (
    <div className="register-business-main-container">
      <div className="register-business-container">
        <div className="register-business-left">
          <div className="register-business-graphics">
            <img src={tiendaOnline} alt="Tienda Online" />
          </div>
        </div>
        <div className="register-business-right">
          <div className="register-business-form">
            <h2>Create an Account</h2>
            <p>Please fill in your business details</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Nombres"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Apellido</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Apellidos"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Documento de identidad</label>
                <input
                  type="text"
                  name="document"
                  placeholder="Documento de identidad"
                  value={form.document}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Teléfono</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Teléfono"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Correo</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Correo"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Crea tu contraseña</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Crea tu contraseña"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Confirmar contraseña</label>
                <input
                  type="password"
                  placeholder="Confirmar contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Nombre de negocio</label>
                <input
                  type="text"
                  name="businessName"
                  placeholder="Nombre de negocio"
                  value={form.businessName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Nombre del representante</label>
                <input
                  type="text"
                  name="representative"
                  placeholder="Nombre del representante"
                  value={form.representative}
                  onChange={handleChange}
                  required
                />
              </div>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <button type="submit" className="btn-register-business">
                Register
              </button>
              <button type="button" className="btn-google">
                <FaGoogle /> Sign up with Google
              </button>
            </form>
            <p className="signup-prompt">
              Already have an account? <a href="#login">Log In</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterBusiness;
