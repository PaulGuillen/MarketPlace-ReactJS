import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store/store";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../../../store/cartSlice";

const ProductBag = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleIncrease = (id: string) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecrease = (id: string) => {
    dispatch(decreaseQuantity(id));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price || "0");
      const quantity = item.quantity || 1;
      return total + price * quantity;
    }, 0);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Carrito de Compras</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-gray-600">Producto</th>
                <th className="px-4 py-2 text-left text-gray-600">Cantidad</th>
                <th className="px-4 py-2 text-left text-gray-600">Total</th>
                <th className="px-4 py-2 text-left text-gray-600">Acción</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className="border-t border-gray-200">
                  <td className="px-4 py-2 flex items-center">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg mr-4"
                    />
                    <div>
                      <h3 className="font-bold">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center">
                      <button
                        onClick={() => handleDecrease(item.id)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        disabled={item.quantity === 1}
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        onClick={() => handleIncrease(item.id)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        disabled={item.quantity >= parseInt(item.stock)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-gray-600">
                    S/ {(parseFloat(item.price || "0") * item.quantity).toFixed(2)}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Resumen del pedido */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Resumen del Pedido</h2>
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-bold">
                S/ {calculateTotal().toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Costo de Envío</span>
              <span className="font-bold">S/ 5.00</span>
            </div>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between mb-4">
            <span className="text-lg font-bold">Total</span>
            <span className="text-lg font-bold">
              S/ {(calculateTotal() + 5).toFixed(2)}
            </span>
          </div>
          <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
            Pagar Ahora
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductBag;
