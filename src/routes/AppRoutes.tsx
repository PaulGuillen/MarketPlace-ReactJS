import { Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";

const Home = React.lazy(() => import("../features/client/pages/home/Home"));
const Login = React.lazy(() => import("../features/auth/pages/login/Login"));
const ForgotPassword = React.lazy(() => import("../features/auth/pages/forgot_password/ForgotPassword"));
const AccountSettings = React.lazy(() => import("../features/auth/pages/client/settings/AccountSettings"));
const Register = React.lazy(() => import("../features/auth/pages/client/register/Register"));
const RegisterBusiness = React.lazy(() => import("../features/auth/pages/business/register/RegisterBusiness"));
const Company = React.lazy(() => import("../features/business/pages/management/company/Company"));
const Product = React.lazy(() => import("../features/business/pages/management/product/Product"));
const Order = React.lazy(() => import("../features/business/pages/management/order/Order"));
const ProductDetail = React.lazy(() => import("../features/client/components/product/ProductDetail"));
const ProductBag = React.lazy(() => import("../features/client/components/bag/ProductBag"));
const PaymentOrder = React.lazy(() => import("../features/client/components/order/PaymentOrder"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
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
        <Route path="/product-bag" element={<ProductBag />} />
        <Route path="/payment-order" element={<PaymentOrder />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
