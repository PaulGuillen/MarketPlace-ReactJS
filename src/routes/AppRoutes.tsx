import { Routes, Route } from "react-router-dom";
import AvailableCategories from "../features/client/pages/all_categories/AvailableCategories";
import Register from "../features/auth/pages/register/Register";
import ForgotPassword from "../features/auth/pages/forgot_password/ForgotPassword";
import SelectBusinessState from "../features/business/pages/state/SelectBusinessState";
import RegisterBusiness from "../features/business/pages/register/RegisterBusiness";
import ValidateCodeBusiness from "../features/business/pages/validate_code/ValidateCodeBusiness";
import Company from "../features/business/pages/management/company/Company";
import Product from "../features/business/pages/management/product/Product";
import Order from "../features/business/pages/management/order/Order";
import Home from "../features/client/pages/home/Home";
import Login from "../features/auth/pages/login/Login";
import SignUp from "../features/auth/pages/client/register/SignUp";
import AccountSettings from "../features/auth/pages/client/settings/AccountSettings";
import SignUpBusiness from "../features/auth/pages/business/register/SignUpBusiness";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/accountSettings" element={<AccountSettings />} />

      <Route path="/signUpClient" element={<SignUp />} />
      <Route path="/signUpBusiness" element={<SignUpBusiness />} />

      <Route path="/availableCategories" element={<AvailableCategories />} />
      <Route path="/selectBusinessState" element={<SelectBusinessState />} />
      <Route path="/validateCodeBusiness" element={<ValidateCodeBusiness />} />
      <Route path="/registerBusiness" element={<RegisterBusiness />} />
      <Route path="/company" element={<Company />} />
      <Route path="/products-business" element={<Product />} />
      <Route path="/orders-business" element={<Order />} />
    </Routes>
  );
};

export default AppRoutes;
