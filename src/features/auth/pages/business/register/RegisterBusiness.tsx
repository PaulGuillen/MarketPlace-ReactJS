import "../../../../../styles/auth/business/RegisterBusiness.css";
import { FaGoogle } from "react-icons/fa";
import tiendaOnline from "../../../../../assets/tienda-online.png";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  authenticateUser,
  checkDocumentExist,
  fetchExistingUserData,
  registerOrUpdateBusiness,
} from "../../../services/RegisterBusiness";
import ProgressLoading from "../../../../../components/progress-loading/ProgressLoading";

const RegisterBusiness = () => {
  const navigate = useNavigate();
  const authenticatedUserRef = useRef(null);
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    document: "",
    ruc: "",
    phone: "",
    email: "",
    currentPassword: "",
    lastPassword: "",
    businessName: "",
    representative: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDocumentDisabled, setIsDocumentDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userUid, setUserUid] = useState("");

  useEffect(() => {
    setIsDocumentDisabled(false);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleDocumentBlur = async () => {
    if (form.document.length >= 8) {
      setErrorMessage("");
      setLoading(true);
      const userUid = await checkDocumentExist(form.document);
      setUserUid(userUid);

      if (userUid) {
        setErrorMessage("Documento encontrado. Cargando datos existentes...");
        const existingData = await fetchExistingUserData(userUid);

        if (existingData) {
          setForm((prevForm) => ({
            ...prevForm,
            ...existingData,
            currentPassword: "",
            lastPassword: "",
          }));
          setIsUpdating(true);
          setIsDocumentDisabled(true);
          setErrorMessage("");
        }
      } else {
        setIsUpdating(false);
      }

      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setErrorMessage("");

    if (!form.document) {
      setErrorMessage("Por favor, ingrese un documento válido.");
      return;
    }

    if (form.currentPassword !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    try {
      let authUser = authenticatedUserRef.current;
      if (isUpdating && form.lastPassword) {
        authUser = await authenticateUser(form.email, form.lastPassword);
        if (!authUser) {
          alert("No se pudo autenticar. Verifica tu contraseña actual.");
          return;
        }
      }

      await registerOrUpdateBusiness(
        userUid,
        form,
        isUpdating,
        authUser,
        form.currentPassword
      );

      alert(
        isUpdating ? "Datos actualizados exitosamente." : "Registro exitoso."
      );
      navigate("/company");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
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
            <h2>
              {isUpdating ? "Update Business Information" : "Create an Account"}
            </h2>
            <p>
              {isUpdating
                ? "Update your business details"
                : "Please fill in your business details"}
            </p>
            <div>
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
                  onBlur={handleDocumentBlur}
                  required
                  disabled={isDocumentDisabled}
                />
              </div>
              <div className="form-group">
                <label>RUC</label>
                <input
                  type="text"
                  name="ruc"
                  placeholder="RUC"
                  value={form.ruc}
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
              {isUpdating && (
                <div className="form-group">
                  <label>Contraseña Anterior</label>
                  <input
                    type="password"
                    name="lastPassword"
                    placeholder="Contraseña anterior"
                    value={form.lastPassword}
                    onChange={handleChange}
                    required={isUpdating}
                  />
                </div>
              )}
              <div className="form-group">
                <label>Nueva Contraseña</label>
                <input
                  type="password"
                  name="currentPassword"
                  placeholder="Nueva contraseña"
                  value={form.currentPassword}
                  onChange={handleChange}
                  required={!isUpdating}
                />
              </div>
              <div className="form-group">
                <label>Confirmar Contraseña</label>
                <input
                  type="password"
                  placeholder="Confirmar contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required={!isUpdating}
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

              <button
                type="button"
                className="btn-register-business"
                onClick={handleSubmit}
              >
                {isUpdating ? "Update" : "Register"}
              </button>

              <button type="button" className="btn-google">
                <FaGoogle /> Sign up with Google
              </button>
            </div>

            <p className="signup-prompt">
              Already have an account? <a href="#login">Log In</a>
            </p>
          </div>
        </div>
      </div>

      {loading && <ProgressLoading />}
    </div>
  );
};

export default RegisterBusiness;
