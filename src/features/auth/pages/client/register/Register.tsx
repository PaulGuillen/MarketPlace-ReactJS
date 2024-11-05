import { useState } from "react";
import "../../../../../styles/auth/client/Register.css";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../../../../config/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegisterClick = async () => {
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      const uid = user.uid;


      await updateProfile(user, {
        displayName: fullName,
      });

      await setDoc(doc(db, "users", uid), {
        uid: uid,
        fullName: fullName,
        email: email,
        phone: phone,
      });

      alert("Registro exitoso");
      navigate("/login"); 
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
            <input type="text" placeholder="Nombre*" />
          </label>
          <label>
            <input type="text" placeholder="Apellido*" />
          </label>
          <label>
            <input type="text" placeholder="DNI*" />
          </label>
          <label>
            <input type="tel" placeholder="Teléfono" />
          </label>
          <label>
            <input type="email" placeholder="Correo*" />
          </label>
          <label>
            <input type="password" placeholder="Crea tu contraseña*" />
          </label>
          <div className="checkbox-container">
            <input type="checkbox" />
            <span className="checkbox-label">
              Autorizo los <a href="#">fines adicionales</a> de tratamiento de mis datos
            </span>
          </div>
          <div className="checkbox-container">
            <input type="checkbox" />
            <span className="checkbox-label">
              He leído y acepto los <a href="#">términos y condiciones</a> y <a href="#">política de privacidad</a>
            </span>
          </div>
          <button type="submit">Crear cuenta</button>
        </form>
        <p className="privacy-links"><a href="/login">Inicia sesión</a></p>
      </div>
    </div>
  );
};

export default Register;
