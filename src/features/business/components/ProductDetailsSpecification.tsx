import "../../../styles/business/ProductDetailSpecification.css";

const ProductDetailsSpecification = () => {
  return (
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
        <button className="add-specification">Agregar Especificación</button>
      </div>
    </div>
  );
};

export default ProductDetailsSpecification;
