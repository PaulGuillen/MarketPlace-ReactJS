import { useCallback, useEffect, useState } from "react";
import { CarouselImage } from "../../../features/model/CarouselImage";
import { CAROUSEL_INTERVAL } from "../../../utils/Constants";
import "../../../styles/BannerSection.css";
import { fetchCarouselImages } from "../services/HomeService";


const BannerSection = () => {
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

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, CAROUSEL_INTERVAL);

    return () => clearInterval(interval);
  }, [handleNext]);

  return (
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
  );
};

export default BannerSection;
