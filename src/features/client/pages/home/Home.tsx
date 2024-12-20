import "./Home.css";
import NavBarHome from "../../../client/components/layouts/NavBarHome";
import IconSection from "../../components/IconSection";
import Category from "../../components/category/Category";
import BannerSection from "../../components/BannerSection";
import { Categories } from "../../../model/Categories";
import StoresSection from "../../components/store/StoresSection";
import BestSellersSection from "../../components/product/BestSellersSection";
import ViralSection from "../../components/product/ViralSection";
import FooterSection from "../../components/layouts/FooterSection";

const Home = () => {
  const handleCategorySelect = (selectedCategory: Categories) => {
    console.log("Selected Category:", selectedCategory);
  };

  return (
    <div className="home-container">
      <NavBarHome />
      <IconSection />
      <BannerSection />
      <Category onCategorySelect={handleCategorySelect} />
      <StoresSection />
      <BestSellersSection />
      <ViralSection />
      <FooterSection />
    </div>
  );
};

export default Home;
