import { useEffect, useState } from "react";
import { fetchBestSellers } from "../../services/HomeService";
import "../../../../styles/BestSellersSections.css";
import { Product } from "../../../model/Product";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../store/cartSlice";

const BestSellersSection = () => {
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const loadBestSellers = async () => {
      const fetchedBestSellers = await fetchBestSellers();
      setBestSellers(fetchedBestSellers);
    };
    loadBestSellers();
  }, []);

  const handleProductClick = (product: Product) => {
    navigate(`/product-detail`, { state: { product } });
  };

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  return (
    <section className="best-sellers-section">
      <h2>Los Más Vendidos</h2>
      <p>Encuentra los productos favoritos de belleza</p>
      <div className="best-sellers-list">
        {bestSellers.map((item) => {
          const showDiscount =
            item.discount !== "0" && item.priceWithDiscount !== "0";

          return (
            <div
              key={item.id}
              className="best-seller-card"
              onClick={() => handleProductClick(item)}
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="product-image"
              />
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <div className="price-container">
                {showDiscount ? (
                  <>
                    <span className="original-price">S/ {item.price}</span>
                    <span className="discounted-price">
                      S/ {item.priceWithDiscount}
                    </span>
                  </>
                ) : (
                  <span className="product-price">S/ {item.price}</span>
                )}
              </div>
              {showDiscount && (
                <span className="discount-badge">-{item.discount}%</span>
              )}
              <button
                className="add-to-cart-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(item);
                }}
              >
                Agregar al carrito
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BestSellersSection;
