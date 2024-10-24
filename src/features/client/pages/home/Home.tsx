import { useEffect, useState, useCallback } from "react";
import "./Home.css";
import { fetchCarouselImages } from "../../services/HomeService";
import { CarouselImage } from "../../../client/model/CarouselImage";
import { CAROUSEL_INTERVAL } from "../../../../utils/Constants";
import NavBarHome from "../../components/NavBarHome";
import IconSection from "../../components/IconSection";
import Category from "../../components/Category";

const Home = () => {
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadImages = async () => {
      const fetchedImages = await fetchCarouselImages();
      setImages(fetchedImages);
      console.log(fetchedImages);
    };

    loadImages();
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const categories = [
    { title: 'Electrodomésticos', type: 'Ofertas' },
    { title: 'Computadoras', type: 'Tecnología' },
    { title: 'Muebles', type: 'Hogar' },
    { title: 'Moda', type: 'Vestimenta' },
    { title: 'Electrodomésticos', type: 'Ofertas' },
    { title: 'Computadoras', type: 'Tecnología' },
    // Agrega más categorías si es necesario
  ];

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
