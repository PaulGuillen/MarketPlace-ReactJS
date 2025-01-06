import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SelectAddress = () => {
  const [selectedAddress, setSelectedAddress] = useState("");
  const [coordinates, setCoordinates] = useState({});
  const navigate = useNavigate();

  const handleAddressSelection = () => {
    navigate("/payment-order", {
      state: { selectedAddress, selectedCoordinates: coordinates },
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Seleccionar Dirección</h1>
      {/* Aquí podrías integrar un mapa o una lista de direcciones */}
      <div>
        <p>Mapa o listado para seleccionar dirección...</p>
        <button
          onClick={() => {
            setSelectedAddress("Av. Ejemplo 123");
            setCoordinates({ latitude: -12.0464, longitude: -77.0428 });
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
        >
          Seleccionar esta dirección
        </button>
      </div>
      <button
        onClick={handleAddressSelection}
        className="bg-green-500 text-white px-4 py-2 rounded-md mt-6"
      >
        Confirmar Dirección
      </button>
    </div>
  );
};

export default SelectAddress;
