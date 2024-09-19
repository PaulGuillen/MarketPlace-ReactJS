import React, { useState } from 'react';
import './BusinessManagement.css'; // Asegúrate de ajustar los estilos en este archivo
import BackButton from '../../../../components/back-button/BackButtons';

const BusinessManagement = () => {
  const [productCount, setProductCount] = useState(1);

  const handleIncrease = () => {
    setProductCount(productCount + 1);
  };

  const handleDecrease = () => {
    if (productCount > 1) {
      setProductCount(productCount - 1);
    }
  };

  return (
    <div className="business-management-container">
      <BackButton onClick={() => window.history.back()} />
      <h1>Gestión de Negocio</h1>

      {/* Card para el logo */}
      <div className="card logo-section">
        <h2>LOGO</h2>
        <div className="logo-upload">
          <input type="file" id="logo-upload-input" />
          <label htmlFor="logo-upload-input" className="upload-icon">📤</label>
        </div>
      </div>

      {/* Card para las categorías */}
      <div className="card categories-section">
        <button>Categoría 1</button>
        <button>Categoría 2</button>
        <button>Categoría 3</button>
        <button>Categoría 4</button>
        <button>Categoría 5</button>
        <button className="add-category-button">➕</button>
      </div>

      {/* Card para el formulario del producto */}
      <div className="card product-form">
        <h2>Producto</h2>
        <div className="product-content">
          {/* Columna izquierda: campos del formulario */}
          <div className="product-fields">
            <input type="text" placeholder="Nombre del producto" />
            <input type="text" placeholder="Detalle del producto" />
            <input type="number" placeholder="Precio del producto" />
            <select>
              <option value="">Seleccionar categoría</option>
              <option value="categoria1">Categoría 1</option>
              <option value="categoria2">Categoría 2</option>
              <option value="categoria3">Categoría 3</option>
            </select>
          </div>

          {/* Columna derecha: imagen y contador */}
          <div className="product-image-section">
            <h3>Imagen</h3>
            <div className="product-image-upload">
              <input type="file" id="product-image-upload" />
              <label htmlFor="product-image-upload" className="upload-icon">📤</label>
            </div>

            {/* Contador de productos */}
            <div className="product-counter">
              <button onClick={handleDecrease}>➖</button>
              <span>{productCount}</span>
              <button onClick={handleIncrease}>➕</button>
            </div>
          </div>
        </div>
      </div>

      {/* Botón para ver productos */}
      <button className="view-products-button">Ver mis productos</button>
    </div>
  );
};

export default BusinessManagement;
