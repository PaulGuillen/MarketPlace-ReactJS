import { useLocation } from "react-router-dom";

const ProductDetail = () => {
  const location = useLocation();
  const { product } = location.state || {};

  if (!product) {
    return <p>No se encontró el producto.</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 text-center">
          Detalles del Producto
        </h1>
        <div className="flex justify-center">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-auto max-w-full h-auto rounded-lg mb-6"
          />
        </div>
        <h2 className="text-2xl font-semibold mb-2 text-gray-700 text-center">
          {product.name}
        </h2>
        <p className="text-gray-600 mb-4 text-center">{product.description}</p>
        <p className="text-lg font-medium text-gray-800 mb-2 text-center">
          Precio: <span className="text-blue-500">S/ {product.price}</span>
        </p>
        {product.discount !== "0" && (
          <div className="bg-green-100 p-4 rounded-lg text-center">
            <p className="text-lg font-medium text-gray-800">
              Precio con Descuento:{" "}
              <span className="text-green-500">
                S/ {product.priceWithDiscount}
              </span>
            </p>
            <p className="text-lg text-gray-600">
              Descuento: {product.discount}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
