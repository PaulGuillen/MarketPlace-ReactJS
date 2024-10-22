import Navbar from "../../../../../layouts/NavBar";
import "./Product.css";


const Product = () => {
    return (
      <div>
        <Navbar />
        <div className="product-container">
  
          <div className="product-form">
            {/* Card para las Categorías */}
            <div className="categories card">
              <h3>Categoría</h3>
              <input className="search-bar" type="text" placeholder="Buscar categoría" />
              <ul>
                <li><input type="checkbox" /> Categoría 1</li>
                <li><input type="checkbox" /> Categoría 2</li>
                <li><input type="checkbox" /> Categoría 3</li>
                <li><input type="checkbox" /> Categoría 4</li>
                <li><input type="checkbox" /> Categoría 5</li>
                <li><button className="add-category">Agregar</button></li>
              </ul>
            </div>
  
            <div className="product-details-specifications card">

            <div className="product-images">
              <div className="image-card">Subir imagen</div>
              <div className="image-card">Subir imagen</div>
              <div className="image-card">Subir imagen</div>
            </div>
            
              <div className="product-details">
                <input type="text" placeholder="Nombre producto" />
                <input type="text" placeholder="Descripción producto" />
                <input type="text" placeholder="Precio producto" />
                <input type="text" placeholder="Cantidad producto" />
                <input type="text" placeholder="Descuento producto" />
              </div>
  
              {/* Línea divisoria vertical */}
              <div className="divider"></div>
  
              <div className="specifications">
                <div className="specification-list">
                  <div className="specification-item">
                    <input type="text" placeholder="Tipo especificación" />
                    <input type="text" placeholder="Descripción especificación" />
                  </div>
                  <div className="specification-item">
                    <input type="text" placeholder="Tipo especificación" />
                    <input type="text" placeholder="Descripción especificación" />
                  </div>
                  <div className="specification-item">
                    <input type="text" placeholder="Tipo especificación" />
                    <input type="text" placeholder="Descripción especificación" />
                  </div>
                </div>
                <button className="add-specification">
                  Agregar Especificación
                </button>
              </div>
            </div>
          </div>
  
          <button className="save-button">Guardar cambios</button>
  
          <div className="product-list">
            <h2>Listado de productos</h2>
            <input type="text" placeholder="Buscar producto" />
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