import "../../../../../styles/auth/business/RegisterBusiness.css";
import { FaGoogle } from "react-icons/fa";
import tiendaOnline from "../../../../../assets/tienda-online.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../../../config/firebaseConfig";

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
          setErrorMessage(
            "No se encontraron datos para este usuario en Firestore."
          );
        }
      } catch (error) {
        console.error("Error al registrar el negocio:", error);
        setErrorMessage(
          "Ocurrió un error al registrar el negocio. Inténtalo de nuevo."
        );
      }
    } else {
      console.log("No hay usuario autenticado.");
      setErrorMessage("No hay un usuario autenticado.");
    }
  };

  return (
    <div className="main-container">
      <div className="register-business-container">
        <div className="register-business-left">
          <div className="register-business-graphics">
            <img src={tiendaOnline} alt="Tienda Online" />
          </div>
        </div>
        <div className="register-business-right">
          <div className="register-business-form">
            <h2>Create an Account</h2>
            <p>Please fill in your business details</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>DNI or CEX</label>
                <input
                  type="text"
                  name="dni"
                  placeholder="DNI or CEX"
                  value={form.dni}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Business Name</label>
                <input
                  type="text"
                  name="businessName"
                  placeholder="Business Name"
                  value={form.businessName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Representative</label>
                <input
                  type="text"
                  name="representative"
                  placeholder="Representative Name"
                  value={form.representative}
                  onChange={handleChange}
                  required
                />
              </div>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <button type="submit" className="btn-register-business">
                Register
              </button>
              <button type="button" className="btn-google">
                <FaGoogle /> Sign up with Google
              </button>
            </form>
            <p className="signup-prompt">
              Already have an account? <a href="#login">Log In</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterBusiness;
