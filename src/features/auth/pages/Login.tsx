import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../config/firebaseConfig";
import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import "./Login.css";
import { validateEmail, validatePassword } from "../../../utils/Utils";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Definir el estado de error

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
      alert("Inicio de sesión exitoso");
    } catch (error: any) {
      setError("Error en inicio de sesión: " + error.message);
      console.error("Error en inicio de sesión:", error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <Input
          type="email"
          name="email"
          placeholder="Ingresa tu correo"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(""); // Clear the error as the user types
          }}
        />
        <Input
          type="password"
          name="password"
          placeholder="Ingresa tu contraseña"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(""); // Clear the error as the user types
          }}
        />
        {error && <p style={{ color: "red" }}>{error}</p>} {/* Mostrar error */}
        <Button type="button" text="Ingresar" onClick={handleLoginClick} />
      </form>
    </div>
  );
};

export default Login;
