import "./Home.css";
import NavBarHome from "../../components/NavBarHome";
import IconSection from "../../components/IconSection";
import Category from "../../components/Category";
import BannerSection from "../../components/BannerSection";
import { Categories } from "../../../model/Categories";
import StoresSection from "../../components/StoresSection";
import BestSellersSection from "../../components/BestSellersSection";
import ViralSection from "../../components/ViralSection";
import FooterSection from "../../components/FooterSection";

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
