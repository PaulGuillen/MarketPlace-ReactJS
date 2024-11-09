import Navbar from "../../../components/NavBar";
import "./Product.css";
import CategorySection from "../../../components/CategorySection";
import ProductDetailsSpecification from "../../../components/ProductDetailsSpecification";

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

        <div className="product-list">
          <h2>Listado de productos</h2>
          <input
            className="search-bar"
            type="text"
            placeholder="Buscar producto"
          />
          <div className="product-item card">
            <div>
              <span>Nombre producto</span>
              <span>Precio producto</span>
              <span>Descuento producto</span>
              <span>Cantidad producto</span>
            </div>
            <div className="description">
              <span>Descripción del producto</span>
            </div>
            <button className="view-more">Ver el resto</button>
          </div>
          <button className="save-button">Guardar cambios</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
