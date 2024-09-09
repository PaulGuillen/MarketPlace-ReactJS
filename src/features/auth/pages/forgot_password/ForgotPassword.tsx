import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../../config/firebaseConfig';
import Button from "../../../../components/button/Button";
import Input from "../../../../components/input/Input";
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Correo de recuperación enviado con éxito");
    } catch (error: any) {
      setMessage("Error al enviar el correo de recuperación: " + error.message);
    }
  };

  return (
    <div className="forgot-password-body">
      <div className="forgot-password-container">
        <h2>Recuperar Contraseña</h2>
        <Input
          type="email"
          name="email"
          placeholder="Ingresa tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {message && <p>{message}</p>}
        <Button type="button" text="Recuperar contraseña" onClick={handlePasswordReset} />
      </div>
    </div>
  );
};

export default ForgotPassword;
