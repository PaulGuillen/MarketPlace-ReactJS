import { useDispatch } from "react-redux";
import ProgressLoading from "../../../../components/progress-loading/ProgressLoading";
import StatusCard from "../../../../components/status-card/StatusCard"; // Importa el StatusCard
import { processPayment } from "../../services/HomeService";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { clearCart } from "../../../../store/cartSlice";

const PaymentOrder = () => {
  const location = useLocation();
  const storedCartItems = localStorage.getItem("cartItems");
  const [cartItems, setCartItems] = useState(
    location.state?.cartItems ||
      (storedCartItems ? JSON.parse(storedCartItems) : [])
  );
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<
    "success" | "error" | null
  >(null);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price || "0");
      const quantity = item.quantity || 1;
      return total + price * quantity;
    }, 0);
  };

  const handleConfirmPayment = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevenir recarga de la página

    // Validar que todos los campos estén llenos
    if (!fullName || !phone || !email || !address) {
      alert("Por favor, completa todos los campos antes de continuar.");
      return;
    }

    const paymentData = {
      payment_method_types: ["card"],
      amount: (calculateTotal() + 5) * 100, // Total en centavos incluyendo envío
      currency: "PEN",
      orderID: `ORD-${Date.now()}`,
      fullName,
      phone,
      email,
      address,
    };

    console.log("Enviando datos de pago:", paymentData);

    setLoading(true);
    const result = await processPayment(paymentData);
    setLoading(false);

    if (result.clientSecret) {
      setPaymentStatus("success");
    } else if (result.error) {
      setPaymentStatus("error");
    }
  };

  useEffect(() => {
    if (cartItems.length > 0) {
      dispatch(clearCart());
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems, dispatch]);

  const handleStatusCardClick = () => {
    if (paymentStatus === "success") {
      dispatch(clearCart());
      localStorage.removeItem("cartItems"); // E
      navigate("/home");
    } else {
      alert("Intenta nuevamente.");
      setPaymentStatus(null);
    }
  };

  if (paymentStatus) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <StatusCard
          status={paymentStatus}
          title={paymentStatus === "success" ? "¡Éxito!" : "¡Error!"}
          message={
            paymentStatus === "success"
              ? "Tu pago se ha procesado correctamente. Gracias por tu compra."
              : "Hubo un problema procesando tu pago. Por favor, inténtalo de nuevo."
          }
          buttonText={
            paymentStatus === "success" ? "Volver al inicio" : "Reintentar"
          }
          onClick={handleStatusCardClick}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen relative">
      {loading && <ProgressLoading />}
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Carrito &gt; Pedido &gt; <span className="text-blue-600">Pago</span>
      </h1>
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Sección Tu Orden */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
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
                  S/{" "}
                  {(item.quantity * parseFloat(item.price || "0")).toFixed(2)}
                </p>
              </div>
            ))}
            <div className="mt-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-semibold">
                  S/ {calculateTotal().toFixed(2)}
                </span>
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

          {/* Nueva Tarjeta para Información Personal */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Información Personal</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-600 mb-2">Teléfono</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="border rounded-md w-full py-2 px-4"
                  placeholder="Número de teléfono"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 mb-2">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border rounded-md w-full py-2 px-4"
                  placeholder="Correo electrónico"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 mb-2">Dirección</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="border rounded-md w-full py-2 px-4"
                  placeholder="Dirección de envío"
                />
              </div>
            </form>
          </div>
        </div>

        {/* Detalles del Pago */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6 max-h-fit">
          <h2 className="text-2xl font-semibold mb-4">Detalles del Pago</h2>
          <div className="flex space-x-4 mb-6">
            <button className="border-2 border-blue-500 rounded-md p-2 flex-1 text-center font-semibold">
              VISA
            </button>
            <button className="border-2 border-gray-300 rounded-md p-2 flex-1 text-center text-gray-500">
              PayPal
            </button>
          </div>
          <form onSubmit={handleConfirmPayment}>
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">
                Titular de la tarjeta
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="border rounded-md w-full py-2 px-4"
                placeholder="Nombre completo"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">
                Número de tarjeta
              </label>
              <input
                type="text"
                className="border rounded-md w-full py-2 px-4"
                placeholder="1111 2222 3333 4444"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-600 mb-2">
                  Fecha de expiración
                </label>
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
              <span className="text-gray-600">
                Guardar información para el futuro
              </span>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-md px-4 py-2 w-full font-semibold"
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
