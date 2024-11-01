import React, { useEffect, useState } from 'react';
import { fetchBestSellers } from '../services/HomeService';
import '../../../styles/BestSellersSections.css';
import { Product } from '../../model/Product';

const BestSellersSection = () => {
  const [bestSellers, setBestSellers] = useState<Product[]>([]);

  useEffect(() => {
    const loadBestSellers = async () => {
      const fetchedBestSellers = await fetchBestSellers();
      setBestSellers(fetchedBestSellers);
    };
    loadBestSellers();
  }, []);

  return (
    <section className="best-sellers-section">
      <h2>Los Más Vendidos</h2>
      <p>Encuentra los productos favoritos de belleza</p>
      <div className="best-sellers-list">
        {bestSellers.map((item) => {
          const showDiscount = item.discount !== "0" && item.priceWithDiscount !== "0";

          return (
            <div key={item.id} className="best-seller-card">
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
              <button className="add-to-cart-button">Agregar al carrito</button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BestSellersSection;
