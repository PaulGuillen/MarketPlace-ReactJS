import { useState } from "react";
import "../../../../../styles/auth/client/Register.css";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../services/Register";
import { useDispatch } from "react-redux";
import { setUser } from "../../../../../store/authSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [document, setDocument] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegisterClick = async () => {
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const user = await registerUser(
        name,
        lastName,
        document,
        email,
        phone,
        password
      );

      dispatch(setUser({ email: email, uid: user.uid }));
      navigate("/home");
    } catch (error: any) {
      setError("Error en el registro: " + error.message);
    }
  };

  return (
    <div className="register-main-container">
      <div className="register-container">
        <h2>Crear cuenta</h2>
        <p>¿Eres nuevo en Ripley?</p>
        <form>
          <label>
            <input
              type="text"
              placeholder="Nombre*"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            <input
              type="text"
              placeholder="Apellido*"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
          <label>
            <input
              type="text"
              placeholder="Documento*"
              value={document}
              onChange={(e) => setDocument(e.target.value)}
              required
            />
          </label>
          <label>
            <input
              type="tel"
              placeholder="Teléfono"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </label>
          <label>
            <input
              type="email"
              placeholder="Correo*"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            <input
              type="password"
              placeholder="Crea tu contraseña*"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label>
            <input
              type="password"
              placeholder="Confirmar contraseña*"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          {error && <p className="error-message">{error}</p>}
          <button
            type="button"
            onClick={handleRegisterClick}
            className="register-button"
          >
            Crear cuenta
          </button>
        </form>
        <p className="privacy-links">
          <a href="/login">Inicia sesión</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
