import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../../config/firebaseConfig"; // Asegúrate de importar tu configuración de Firebase
import "./Register.css";
import Input from "../../../../components/input/Input";
import Button from "../../../../components/button/Button";
import BackButton from "../../../../components/back-button/BackButtons";

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
      // Registrar al usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      const uid = user.uid;

      // Actualizar el perfil del usuario en Firebase Auth
      await updateProfile(user, {
        displayName: fullName,
      });

      // Guardar los datos adicionales en Firestore
      await setDoc(doc(db, "users", uid), {
        uid: uid, // UID como campo en Firestore
        fullName: fullName,
        email: email,
        phone: phone,
      });

      alert("Registro exitoso");
      navigate("/login"); // Redirigir al login
    } catch (error: any) {
      setError("Error en el registro: " + error.message);
    }
  };

  const handleReturn = () => {
    navigate("/"); // Navegar a la página principal
  };

  return (
    <div>
      <BackButton onClick={handleReturn} />
      <div className="register-body">
        <div className="register-container">
          <h2>Registro</h2>
          <form>
            <Input
              type="text"
              name="fullName"
              placeholder="Nombre completo"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <Input
              type="email"
              name="email"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="text"
              name="phone"
              placeholder="Número de teléfono"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Input
              type="password"
              name="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <Button
              type="button"
              text="Registrar"
              onClick={handleRegisterClick}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
