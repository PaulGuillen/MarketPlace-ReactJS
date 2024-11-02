import React from "react";
import { useDispatch } from "react-redux";
import { clearUser } from "../../../../../store/authSlice";
import { getAuth, signOut } from "firebase/auth";
import "../../../../../styles/auth/client/AccountSettings.css";
import { useNavigate } from "react-router-dom";

const AccountSettings = () => {
  const dispatch = useDispatch();
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
      navigate("/Home");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className="account-settings">
      <h1>Account Settings</h1>
      <button onClick={handleLogout} className="logout-button">
        Cerrar sesión
      </button>
    </div>
  );
};

export default AccountSettings;
