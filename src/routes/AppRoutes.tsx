import { Routes, Route } from "react-router-dom";
import AvailableCategories from "../features/client/all_business/pages/AvailableCategories";
import Login from "../features/auth/pages/Login";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/AvailableCategories" element={<AvailableCategories />} />
    </Routes>
  );
};

export default AppRoutes;
