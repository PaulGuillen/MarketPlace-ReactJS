import { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../config/firebaseConfig";
import Button from "../../../../components/button/Button";
import "./Login.css";
import { validateEmail, validatePassword } from "../../../../utils/Utils";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Definir el estado de error
  const navigate = useNavigate();

  useEffect(() => {
    const preventGoBack = () => {
      window.history.pushState(null, "", window.location.href); // Reemplaza la página actual en el historial
    };

    window.history.pushState(null, "", window.location.href); // Evita el retroceso al cargar la página
    window.addEventListener("popstate", preventGoBack); // Escucha el evento de retroceso

    return () => {
      window.removeEventListener("popstate", preventGoBack); // Limpia el evento cuando el componente se desmonte
    };
  }, []);

  const handleLoginClick = async () => {
    setError(""); // Limpiamos los errores antes de la validación

    // Validación de correo y contraseña
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
      console.log("Usuario logueado:", userCredential.user);
      navigate("/AvailableCategories"); 
    } catch (error: any) {
      setError("Error en inicio de sesión: " + error.message);
      console.error("Error en inicio de sesión:", error.message);
    }
  };

  return (
    <div className="login-body">
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <input
          type="email"
          name="email"
          placeholder="Ingresa tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Ingresa tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Button type="button" text="Ingresar" onClick={handleLoginClick} />
      </form>
      <div className="links">
        <p>
          ¿Aún no tienes cuenta?{" "}
          <span className="link" onClick={() => navigate("/register")}>
            Regístrate
          </span>
        </p>
        <p>
          ¿Has olvidado tu contraseña?{" "}
          <span className="link" onClick={() => navigate("/forgot-password")}>
            Recuperar contraseña
          </span>
        </p>
      </div>
    </div>
  </div>
  );
};

export default Login;
