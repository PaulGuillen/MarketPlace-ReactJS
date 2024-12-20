import { useEffect, useState } from 'react';
import { fetchVirals } from '../../services/HomeService';
import '../../../../styles/ViralSection.css';
import { Product } from '../../../model/Product';

const ViralSection = () => {
  const [viralProducts, setViralProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadBestSellers = async () => {
      const fetchViralProducts = await fetchVirals();
      setViralProducts(fetchViralProducts);
    };
    loadBestSellers();
  }, []);

  return (
    <section className="viral-section">
      <h2>Los Más Virales</h2>
      <p>Encuentra los productos mas recomendados y en tendencia</p>
      <div className="viral-list">
        {viralProducts.map((item) => {
          const showDiscount = item.discount !== "0" && item.priceWithDiscount !== "0";

          return (
            <div key={item.id} className="viral-card">
              <img src={item.imageUrl} alt={item.name} className="product-image" />
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <div className="price-container">
                {showDiscount ? (
                  <>
                    <span className="original-price">S/ {item.price}</span>
                    <span className="discounted-price">S/ {item.priceWithDiscount}</span>
                  </>
                ) : (
                  <span className="product-price">S/ {item.price}</span>
                )}
              </div>
              {showDiscount && <span className="discount-badge">-{item.discount}%</span>}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ViralSection;
