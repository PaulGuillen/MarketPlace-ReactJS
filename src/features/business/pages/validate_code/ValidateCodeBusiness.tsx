import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../../../config/firebaseConfig";
import emailjs from 'emailjs-com'; // Importar EmailJS
import "./ValidateCodeBusiness.css";
import BackButton from "../../../../components/back-button/BackButtons";

const ValidateCodeBusiness = () => {
  const [code, setCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [seconds, setSeconds] = useState(30); // 30 segundos para reenviar código
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // Estado del botón
  const navigate = useNavigate();

  // Obtener el usuario actual
  const auth = getAuth();
  const user = auth.currentUser;

  const generateCode = () => {
    const randomCode = Math.floor(100000 + Math.random() * 900000).toString(); // Código de 6 dígitos
    return randomCode;
  };

  // Enviar correo con EmailJS
  const sendCodeByEmail = (email: string, code: string) => {
    const templateParams = {
      user_email: email,
      verification_code: code,
    };

    emailjs.send('service_095cbsr', 'template_3ghjlon', templateParams, '3zxyMJU8u4520tnNw')
      .then((response) => {
        console.log('Correo enviado exitosamente!', response.status, response.text);
        console.log('Código enviado por correo:', code + " para el usuario: " + email);
      }, (err) => {
        console.error('Error al enviar el correo:', err);
      });
  };

  // Ahora siempre se sobrescribirá el código en Firestore y se enviará uno nuevo
  const sendCodeToFirestore = useCallback(
    async (code: string) => {
      if (user) {
        const userEmail = user.email;
        const userRef = doc(db, "verificationCodes", user.uid);
        try {
          // Sobrescribir el código en Firestore
          await setDoc(userRef, {
            email: userEmail,
            verificationCode: code,
            createdAt: new Date(),
          });

          // Enviar el correo con el nuevo código
          sendCodeByEmail(userEmail, code);
          console.log("Nuevo código guardado en Firestore y enviado por correo:", code + " para el usuario: " + userEmail);
        } catch (error) {
          console.error("Error al guardar el código en Firestore o enviar el correo:", error);
        }
      }
    },
    [user]
  );

  // Temporizador para habilitar el botón de reenviar código
  useEffect(() => {
    if (seconds > 0) {
      const timer = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setIsButtonDisabled(false); // Habilitar el botón al llegar a 0
    }
  }, [seconds]);

  // Reenviar código y reiniciar el temporizador
  const handleResendCode = () => {
    if (user) {
      const newCode = generateCode();
      setGeneratedCode(newCode);
      sendCodeToFirestore(newCode); // Siempre enviará un nuevo código

      // Reiniciar temporizador
      setSeconds(30);
      setIsButtonDisabled(true); // Deshabilitar el botón nuevamente
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (user) {
      const userRef = doc(db, "verificationCodes", user.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const storedCode = userDoc.data().verificationCode;

        if (storedCode === code) {
          alert("Código validado correctamente.");
          navigate("/company");
        } else {
          setErrorMessage("El código ingresado es incorrecto.");
        }
      } else {
        setErrorMessage("No se encontró un código para este usuario.");
      }
    }
  };

  return (
    <div className="validate-code-container">
      <BackButton onClick={() => navigate("/selectBusinessState")} />

      <div className="validate-card">
        <h2>Validación</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ingresa el código que se envió a tu correo"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="code-input"
          />
          <p>
            ¿Olvidaste el correo? Enviar el código a mi número de teléfono
          </p>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="validate-button">
            Validar
          </button>
        </form>

        <div className="resend-section">
          <p>
            {isButtonDisabled
              ? `Reenviar código en ${seconds} segundos...`
              : "Puedes reenviar el código ahora."}
          </p>
          <button
            className="resend-button"
            onClick={handleResendCode}
            disabled={isButtonDisabled}
          >
            Reenviar código
          </button>
        </div>
      </div>
    </div>
  );
};

export default ValidateCodeBusiness;
