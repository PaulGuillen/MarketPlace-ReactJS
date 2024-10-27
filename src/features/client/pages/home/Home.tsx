import "./Home.css";
import NavBarHome from "../../components/NavBarHome";
import IconSection from "../../components/IconSection";
import Category from "../../components/Category";
import BannerSection from "../../components/BannerSection";
import { CategoriesHome } from "../../../../features/model/CategoriesHome";
import StoresSection from "../../components/StoresSection";

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
    </div>
  );
};

export default Home;
