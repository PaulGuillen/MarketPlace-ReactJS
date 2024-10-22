import React, { useEffect, useState, useCallback } from "react";
import assistantImage from "../../../../assets/icon_assistant.png";
import deliveryImage from "../../../../assets/icon_delivery.png";
import percentImage from "../../../../assets/icon_percent.png";
import safeImage from "../../../../assets/icon_safe.png";
import "./Home.css";
import { fetchCarouselImages } from "../../services/HomeService";
import { CarouselImage } from "../../../client/model/CarouselImage";
import { CAROUSEL_INTERVAL } from "../../../../utils/Constants";

const Home = () => {
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Función para cargar las imágenes desde Firebase
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
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, CAROUSEL_INTERVAL); 

    return () => clearInterval(interval); 
  }, [handleNext]);

  return (
    <div className="home-container">
      <header className="navbar">
        <div className="navbar-left">
          <button className="menu-button">☰ Menú</button>
          <button className="location-button">📍 Ingresa tu ubicación</button>
        </div>
        <div className="navbar-center">
          <input type="text" placeholder="Buscar Productos" className="search-bar" />
        </div>
        <div className="navbar-right">
          <button className="login-button">¡Hola! Inicia sesión</button>
          <button className="cart-button">🛒</button>
        </div>
      </header>

      {/* Sección de íconos */}
      <section className="icon-container">
        <div className="icon-item">
          <img src={deliveryImage} alt="Delivery image" />
          <p>Delivery seguro</p>
        </div>
        <div className="icon-item">
          <img src={percentImage} alt="Percent image" />
          <p>Confianza</p>
        </div>
        <div className="icon-item">
          <img src={safeImage} alt="Safe image" />
          <p>Compra seguro</p>
        </div>
        <div className="icon-item">
          <img src={assistantImage} alt="Assistant image" />
          <p>Necesitas ayuda?</p>
        </div>
      </section>

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
    </div>
  );
};

export default Home;
