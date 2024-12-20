import { useLocation } from "react-router-dom";
import { useState } from "react";
import ProgressLoading from "../../../../components/progress-loading/ProgressLoading";
import { fetchUserData, processPayment } from "../../services/HomeService";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

const ProductDetail = () => {
  const location = useLocation();
  const { product } = location.state || {};
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const [userFetch, setUserFetch] = useState(null);

  console.log("Product:", product);
  console.log("User:", user);
  console.log("isAuthenticated:", isAuthenticated);

  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  if (!product) {
    return <p>No se encontró el producto.</p>;
  }

  const fetchUser = async () => {
    setLoading(true);
    try {
      const data = await fetchUserData();
      if (data) {
        setUserFetch(data);
        console.log("Data:", data);
      }
    } catch (error) {
      console.error("Error initializing form data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleIncrease = () => {
    if (quantity < parseInt(product.stock)) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handlePayment = async () => {
    if (!userFetch) {
      await fetchUser();
    }
  
    if (!userFetch) {
      alert("No se pudieron obtener los datos del usuario.");
      return;
    }
  
    const amount = product.priceWithDiscount
      ? parseFloat(product.priceWithDiscount) * 100 * quantity
      : parseFloat(product.price) * 100 * quantity;
  
    const paymentData = {
      payment_method_types: ["card"],
      amount,
      currency: "PEN",
      orderID: `ORD-${Date.now()}`,
      fullName: userFetch.name + " " + userFetch.lastName,
      phone: userFetch.phone || "Número no disponible",
      email: userFetch.email || "Correo no disponible",
      address: userFetch.address || "Dirección no disponible", 
    };
  
    console.log("Datos de pago enviados:", paymentData);
  
    setLoading(true);
    const result = await processPayment(paymentData);
    setLoading(false);
  
    if (result.clientSecret) {
      alert("Pago exitoso. ClientSecret: " + result.clientSecret);
    } else if (result.error) {
      alert("Error en el pago: " + result.error);
    }
  };
  
  const total = product.priceWithDiscount
    ? parseFloat(product.priceWithDiscount) * quantity
    : parseFloat(product.price) * quantity;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {loading && <ProgressLoading />}
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
          Precio:{" "}
          <span className="text-blue-500">
            S/{" "}
            {product.priceWithDiscount
              ? product.priceWithDiscount
              : product.price}
          </span>
        </p>
        {product.discount !== "0" && (
          <div className="bg-green-100 p-4 rounded-lg text-center mb-4">
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
        <div className="flex flex-col items-center mt-4">
          <div className="flex items-center gap-4 mb-4">
            <button
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
              onClick={handleDecrease}
              disabled={quantity === 1}
            >
              -
            </button>
            <span className="text-lg font-medium">{quantity}</span>
            <button
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
              onClick={handleIncrease}
              disabled={quantity >= parseInt(product.stock)}
            >
              +
            </button>
          </div>
          <p className="text-gray-600 text-sm">
            Stock disponible: {product.stock}
          </p>
        </div>
        <p className="text-lg font-medium text-gray-800 mt-4 text-center">
          Total a pagar:{" "}
          <span className="text-blue-500">S/ {total.toFixed(2)}</span>
        </p>
        <div className="flex justify-center mt-6">
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? "Procesando..." : "Pagar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
