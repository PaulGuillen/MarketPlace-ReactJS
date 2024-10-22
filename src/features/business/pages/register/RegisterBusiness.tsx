import { useState } from "react";
import "./RegisterBusiness.css";
import BackButton from "../../../../components/back-button/BackButtons";
import Button from "../../../../components/button/Button";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc, collection, query, where, getDocs } from "firebase/firestore"; 
import { db } from "../../../../config/firebaseConfig"; 

const RegisterBusiness = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    dni: "",
    businessName: "",
    representative: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setErrorMessage("");
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      try {
        const businessRef = collection(db, "business");
        const q = query(businessRef, where("dni", "==", form.dni));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {

          setErrorMessage("Este DNI ya está registrado.");
          return; 
        }

        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const { phone } = userDocSnap.data();

          const businessData = {
            uid: user.uid, 
            fullName: user.displayName, 
            email: user.email, 
            phone: phone, 
            dni: form.dni, 
            businessName: form.businessName,
            representative: form.representative, 
          };


          await setDoc(doc(db, "business", user.uid), businessData);
          console.log("Negocio registrado con éxito:", businessData);

    
          navigate("/company");
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
      <BackButton onClick={() => navigate("/selectBusinessState")} />
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
