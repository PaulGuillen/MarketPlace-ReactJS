import { useState } from "react";
import "../../../../../styles/auth/client/Login.css";
import { auth } from "../../../../../config/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../../../../../utils/Utils";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../../../../../store/authSlice"; 
export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(""); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginClick = async () => {
    setError(""); 

    if (!validateEmail(email)) {
      setError("Por favor, ingresa un correo válido.");
      return;
    }

    if (!validatePassword(password)) {
      setError("La contraseña no es válida.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      dispatch(setUser({ email: user.email, uid: user.uid }));
      navigate("/Home");
    } catch (error: any) {
      setError("Error en inicio de sesión: " + error.message);
      console.error("Error en inicio de sesión:", error.message);
    }
  };

  return (
    <div className="main-container">
      <div className="login-container">
        <h2>Iniciar sesión</h2>
        <p>¡Bienvenido a Ripley.com!</p>
        <form>
          <label>
            <input
              type="text"
              name="email"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <input
              type="password"
              name="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="button" onClick={handleLoginClick}>
            Iniciar sesión
          </button>
          <button type="button">Iniciar sesión con Google</button>
          <button type="button">Iniciar sesión con Apple</button>
        </form>
        <p>
          ¿Eres nuevo? <a href="/signUpClient">Crear cuenta</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
