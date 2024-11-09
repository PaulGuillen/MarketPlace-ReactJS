import "../../../styles/business/ProductManagement.css";

const ProductManagement = () => {
  return (
    <div className="product-list">
      <h2>Listado de productos</h2>
      <input className="search-bar-product-management" type="text" placeholder="Buscar producto" />
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
    </div>
  );
};

export default ProductManagement;
