import { useEffect, useState } from "react";
import { fetchVirals } from "../../services/HomeService";
import { Product } from "../../../model/Product";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../store/cartSlice";

const ViralSection = () => {
  const [viralProducts, setViralProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const loadViralProducts = async () => {
      const fetchedViralProducts = await fetchVirals();
      setViralProducts(fetchedViralProducts);
    };
    loadViralProducts();
  }, []);

  const handleProductClick = (product: Product) => {
    navigate(`/product-detail`, { state: { product } });
  };

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  return (
    <section className="pb-10 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Los Más Vendidos
        </h2>
        <div className="flex items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {viralProducts.map((item) => {
              const showDiscount =
                item.discount !== "0" && item.priceWithDiscount !== "0";

              return (
                <div
                  key={item.id}
                  className="relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => handleProductClick(item)}
                >
                  <div className="relative">
                    {showDiscount && (
                      <span className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold rounded-br-lg px-4 py-2 flex items-center justify-center">
                        -{item.discount}%
                      </span>
                    )}
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-[271px] h-[186px] object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                    <div className="mt-4">
                      {showDiscount ? (
                        <>
                          <span className="text-gray-500 line-through mr-2">
                            S/ {item.price}
                          </span>
                          <span className="text-green-500 font-bold">
                            S/ {item.priceWithDiscount}
                          </span>
                        </>
                      ) : (
                        <span className="text-gray-800 font-bold">
                          S/ {item.price}
                        </span>
                      )}
                    </div>
                    <button
                      className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(item);
                      }}
                    >
                      Agregar al carrito
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViralSection;
