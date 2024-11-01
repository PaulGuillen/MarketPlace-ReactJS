import "./Home.css";
import NavBarHome from "../../components/NavBarHome";
import IconSection from "../../components/IconSection";
import Category from "../../components/Category";
import BannerSection from "../../components/BannerSection";
import { CategoriesHome } from "../../../../features/model/CategoriesHome";
import StoresSection from "../../components/StoresSection";
import BestSellersSection from "../../components/BestSellersSection";

const Home = () => {
  
  const handleCategorySelect = (selectedCategory: CategoriesHome) => {
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
    </div>
  );
};

export default Home;
