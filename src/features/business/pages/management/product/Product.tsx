import Navbar from "../../../components/NavBar";
import "./Product.css";
import CategorySection from "../../../components/CategorySection";
import ProductDetailsSpecification from "../../../components/ProductDetailsSpecification";
import ProductManagement from "../../../components/ProductManagement";

const Product = () => {
  return (
    <div>
      <Navbar />
      <div className="product-container">
        <div className="product-form">
          <CategorySection />
          <ProductDetailsSpecification />
        </div>

        <button className="save-button">Guardar cambios</button>

        <ProductManagement />
      </div>
    </div>
  );
};

export default Product;
