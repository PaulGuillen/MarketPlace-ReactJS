import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../config/firebaseConfig";
import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Para manejar los errores de autenticación

  const handleLoginClick = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Usuario logueado:", userCredential.user);
      alert("Inicio de sesión exitoso");
    } catch (error: any) {
      setError(error.message);
      console.error("Error en inicio de sesión:", error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Mostramos el error si ocurre */}
      <form>
        <Input
          type="email"
          name="email"
          placeholder="Ingresa tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          name="password"
          placeholder="Ingresa tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="button" text="Ingresar" onClick={handleLoginClick} />
      </form>
    </div>
  );
};

export default Login;
