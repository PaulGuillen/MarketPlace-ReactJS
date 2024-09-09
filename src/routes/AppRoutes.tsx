import { Routes, Route } from "react-router-dom";
import AvailableCategories from "../features/client/all_business/pages/AvailableCategories";
import Login from "../features/auth/pages/login/Login";
import Register from "../features/auth/pages/register/Register";
import ForgotPassword from "../features/auth/pages/forgot_password/ForgotPassword";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/AvailableCategories" element={<AvailableCategories />} />
    </Routes>
  );
};

export default AppRoutes;
