import { Routes, Route } from "react-router-dom";
import ForgotPassword from "../features/auth/pages/forgot_password/ForgotPassword";
import Company from "../features/business/pages/management/company/Company";
import Product from "../features/business/pages/management/product/Product";
import Order from "../features/business/pages/management/order/Order";
import Home from "../features/client/pages/home/Home";
import Login from "../features/auth/pages/login/Login";
import AccountSettings from "../features/auth/pages/client/settings/AccountSettings";
import RegisterBusiness from "../features/auth/pages/business/register/RegisterBusiness";
import Register from "../features/auth/pages/client/register/Register";
import ProductDetail from "../features/client/components/product/ProductDetail";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />

      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/accountSettings" element={<AccountSettings />} />

      <Route path="/registerClient" element={<Register />} />
      <Route path="/registerBusiness" element={<RegisterBusiness />} />

      <Route path="/company" element={<Company />} />
      <Route path="/products-business" element={<Product />} />
      <Route path="/orders-business" element={<Order />} />

      <Route path="/product-detail" element={<ProductDetail />} />
    </Routes>
  );
};

export default AppRoutes;
