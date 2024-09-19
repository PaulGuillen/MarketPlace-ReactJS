import { useState } from "react";
import "./RegisterBusiness.css";
import BackButton from "../../../../components/back-button/BackButtons";
import Button from "../../../../components/button/Button";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth"; // Importar Firebase Auth
import { doc, getDoc, setDoc, collection, query, where, getDocs } from "firebase/firestore"; // Importar Firestore
import { db } from "../../../../config/firebaseConfig"; // Asegúrate de que tienes configurada la instancia de Firestore

const RegisterBusiness = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    dni: "",
    businessName: "",
    representative: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // Para mostrar errores

  // Manejar cambios en el formulario
  const handleChange = (e: { target: { name: any; value: any } }) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Manejar envío del formulario
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Limpiar mensajes de error anteriores
    setErrorMessage("");

    // Obtener el usuario actual de FirebaseAuth
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      try {
        // Verificar si el DNI ya está registrado en Firestore
        const businessRef = collection(db, "business");
        const q = query(businessRef, where("dni", "==", form.dni));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // Si el DNI ya está registrado, mostrar mensaje de error
          setErrorMessage("Este DNI ya está registrado.");
          return; // No continuar con el registro
        }

        // Obtener el documento del usuario en Firestore
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          // Obtener el campo phone del documento del usuario
          const { phone } = userDocSnap.data();

          // Crear un nuevo documento en la colección "business" con los datos del formulario y el teléfono del usuario
          const businessData = {
            uid: user.uid, // ID del usuario actual
            fullName: user.displayName, // Nombre del usuario
            email: user.email, // Email del usuario
            phone: phone, // Teléfono del usuario desde Firestore
            dni: form.dni, // DNI del formulario
            businessName: form.businessName, // Nombre de negocio del formulario
            representative: form.representative, // Representante del formulario
          };

          // Guardar la información en Firestore en la colección "business"
          await setDoc(doc(db, "business", user.uid), businessData);
          console.log("Negocio registrado con éxito:", businessData);

          // Redirigir a otra página
          navigate("/BusinessManagement");
        } else {
          setErrorMessage("No se encontraron datos para este usuario en Firestore.");
        }
      } catch (error) {
        console.error("Error al registrar el negocio:", error);
        setErrorMessage("Ocurrió un error al registrar el negocio. Inténtalo de nuevo.");
      }
    } else {
      console.log("No hay usuario autenticado.");
      setErrorMessage("No hay un usuario autenticado.");
    }
  };

  return (
    <div className="register-business-body">
      <BackButton onClick={() => navigate("/SelectBusinessState")} />
      <div className="register-business-container">
        <h2>Debes completar estos campos para continuar</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            name="dni"
            placeholder="DNI o CEX"
            value={form.dni}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="businessName"
            placeholder="Nombre de negocio"
            value={form.businessName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="representative"
            placeholder="Nombre del representante"
            value={form.representative}
            onChange={handleChange}
            required
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Mostrar mensaje de error si existe */}
          <Button type="submit" text="Registrar" />
        </form>
      </div>
    </div>
  );
};

export default RegisterBusiness;
