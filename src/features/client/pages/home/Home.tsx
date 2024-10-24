import { useEffect, useState, useCallback } from "react";
import "./Home.css";
import { fetchCarouselImages, fetchCategories } from "../../services/HomeService";
import { CarouselImage } from "../../../model/CarouselImage";
import { CAROUSEL_INTERVAL } from "../../../../utils/Constants";
import NavBarHome from "../../components/NavBarHome";
import IconSection from "../../components/IconSection";
import { CategoriesHome } from "features/model/CategoriesHome";
import Category from "../../components/Category";

const Home = () => {
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [categories, setCategories] = useState<CategoriesHome[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadImages = async () => {
      const fetchedImages = await fetchCarouselImages();
      setImages(fetchedImages);
      console.log(fetchedImages);
    };

    const loadCategories = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
      console.log(fetchedCategories);
    };

    loadImages();
    loadCategories();
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, CAROUSEL_INTERVAL);

    return () => clearInterval(interval);
  }, [handleNext]);

  return (
    <div className="home-container">
      <NavBarHome />
      <IconSection />

      {/* Sección del carrusel/banner */}
      <section className="banner-section">
        <div className="carousel-container">
          {images.length > 0 && (
            <>
              <button className="prev" onClick={handlePrev}>
                {"<"}
              </button>
              <img
                src={images[currentIndex].url}
                alt={images[currentIndex].title}
                className="carousel-image"
              />
              <button className="next" onClick={handleNext}>
                {">"}
              </button>
            </>
          )}
        </div>
      </section>

      <Category categories={categories} />
    </div>
  );
};

export default Home;
