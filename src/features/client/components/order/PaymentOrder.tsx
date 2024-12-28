import ProgressLoading from "../../../../components/progress-loading/ProgressLoading";
import { fetchUserData, processPayment } from "../../services/HomeService";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const PaymentOrder = () => {
  const location = useLocation();
  const { cartItems } = location.state || { cartItems: [] };
  const [loading, setLoading] = useState(false);
  const [userFetch, setUserFetch] = useState(null);

  const fetchUser = async () => {
    try {
      const data = await fetchUserData();
      if (data) {
        setUserFetch(data);
      }
    } catch (error) {
      console.error("Error obteniendo datos del usuario:", error);
      alert("Hubo un problema al obtener los datos del usuario.");
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price || "0");
      const quantity = item.quantity || 1;
      return total + price * quantity;
    }, 0);
  };

  const handleConfirmPayment = async () => {
    if (!userFetch) {
      setLoading(true);
      await fetchUser();
      setLoading(false);
    }

    if (!userFetch) {
      alert("No se pudieron obtener los datos del usuario.");
      return;
    }

    const paymentData = {
      payment_method_types: ["card"],
      amount: (calculateTotal() + 5) * 100, // Total en centavos incluyendo envío
      currency: "PEN",
      orderID: `ORD-${Date.now()}`,
      fullName: `${userFetch.name} ${userFetch.lastName}`,
      phone: userFetch.phone || "Número no disponible",
      email: userFetch.email || "Correo no disponible",
      address: userFetch.address || "Dirección no disponible",
    };

    console.log("Enviando datos de pago:", paymentData);

    setLoading(true);
    const result = await processPayment(paymentData);
    setLoading(false);

    if (result.clientSecret) {
      alert("Pago exitoso. ClientSecret: " + result.clientSecret);
    } else if (result.error) {
      alert("Error en el pago: " + result.error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen relative">
      {loading && <ProgressLoading />}
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Carrito &gt; Pedido &gt; <span className="text-blue-600">Pago</span>
      </h1>
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Tu Orden</h2>
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center border-b py-4">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div className="ml-4">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-500">{item.description}</p>
                <p className="font-medium">Cantidad: {item.quantity}</p>
              </div>
              <p className="ml-auto font-semibold">
                S/ {(item.quantity * parseFloat(item.price || "0")).toFixed(2)}
              </p>
            </div>
          ))}
          <div className="mt-4">
            <input
              type="text"
              placeholder="Código de descuento"
              className="border rounded-md w-full py-2 px-4 mb-2"
            />
            <button className="bg-blue-500 text-white rounded-md px-4 py-2 w-full">
              Aplicar código
            </button>
          </div>
          <div className="mt-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-semibold">S/ {calculateTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Envío</span>
              <span className="font-semibold">S/ 5.00</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t pt-2">
              <span>Total</span>
              <span>S/ {(calculateTotal() + 5).toFixed(2)}</span>
            </div>
          </div>
        </div>
  
        {/* Detalles del pago */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Detalles del Pago</h2>
          <div className="flex space-x-4 mb-6">
            <button className="border-2 border-blue-500 rounded-md p-2 flex-1 text-center font-semibold">
              VISA
            </button>
            <button className="border-2 border-gray-300 rounded-md p-2 flex-1 text-center text-gray-500">
              PayPal
            </button>
          </div>
          <form>
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Titular de la tarjeta</label>
              <input
                type="text"
                className="border rounded-md w-full py-2 px-4"
                placeholder="Nombre completo"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Número de tarjeta</label>
              <input
                type="text"
                className="border rounded-md w-full py-2 px-4"
                placeholder="1111 2222 3333 4444"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-600 mb-2">Fecha de expiración</label>
                <input
                  type="text"
                  className="border rounded-md w-full py-2 px-4"
                  placeholder="MM/AA"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-2">CVV</label>
                <input
                  type="text"
                  className="border rounded-md w-full py-2 px-4"
                  placeholder="123"
                />
              </div>
            </div>
            <div className="flex items-center mb-6">
              <input type="checkbox" className="mr-2" />
              <span className="text-gray-600">Guardar información para el futuro</span>
            </div>
            <button
              className="bg-blue-500 text-white rounded-md px-4 py-2 w-full font-semibold"
              onClick={handleConfirmPayment}
              disabled={loading}
            >
              {loading ? "Procesando..." : "Paga ahora"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
  
};

export default PaymentOrder;
