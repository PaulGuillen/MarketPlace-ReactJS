import { Routes, Route } from "react-router-dom";
import AvailableCategories from "../features/client/pages/all_categories/AvailableCategories";
import Login from "../features/auth/pages/login/Login";
import Register from "../features/auth/pages/register/Register";
import ForgotPassword from "../features/auth/pages/forgot_password/ForgotPassword";
import SelectBusinessState from "../features/business/pages/state/SelectBusinessState";
import RegisterBusiness from "../features/business/pages/register/RegisterBusiness";
import ValidateCodeBusiness from "../features/business/pages/validate_code/ValidateCodeBusiness";
import Company from "../features/business/pages/management/company/Company";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/AvailableCategories" element={<AvailableCategories />} />
      <Route path="/SelectBusinessState" element={<SelectBusinessState />} />
      <Route path="/ValidateCodeBusiness" element={<ValidateCodeBusiness />} />
      <Route path="/RegisterBusiness" element={<RegisterBusiness />} />
      <Route path="/Company" element={<Company />} />
    </Routes>
  );
};

export default AppRoutes;
