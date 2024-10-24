import { useCallback, useEffect, useRef, useState } from "react";
import { CarouselImage } from "../../../features/model/CarouselImage";
import { CAROUSEL_INTERVAL } from "../../../utils/Constants";
import "../../../styles/BannerSection.css";
import { fetchCarouselImages } from "../services/HomeService";

const BannerSection = () => {
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const loadImages = async () => {
      const fetchedImages = await fetchCarouselImages();
      setImages(fetchedImages);
    };

    loadImages();
  }, []);

  const restartInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, CAROUSEL_INTERVAL);
  }, [images.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    restartInterval();
  }, [images.length, restartInterval]);

  const handlePrev = useCallback(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
    restartInterval();
  }, [images.length, restartInterval]);

  useEffect(() => {
    restartInterval();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [restartInterval]);

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
