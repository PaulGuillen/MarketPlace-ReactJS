import "./Home.css";
import NavBarHome from "../../components/NavBarHome";
import IconSection from "../../components/IconSection";
import Category from "../../components/Category";
import BannerSection from "../../components/BannerSection";

const Home = () => {
  return (
    <div className="home-container">
      <NavBarHome />
      <IconSection />
      <BannerSection />
      <Category />
    </div>
  );
};

export default Home;
