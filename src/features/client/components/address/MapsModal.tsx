import React, { useRef, useState, useEffect } from "react";
import { Modal, Button } from "antd";
import maplibregl from "maplibre-gl";

interface MapsModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (address: string, coordinates: { lat: number; lng: number }) => void;
}

const MapsModal: React.FC<MapsModalProps> = ({ visible, onClose, onSelect }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [selectedCoordinates, setSelectedCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<string>("");

  const handleMapClick = async (event: maplibregl.MapMouseEvent) => {
    const { lng, lat } = event.lngLat;
    setSelectedCoordinates({ lat, lng });

    // Obtener dirección usando OpenStreetMap
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      const address = data.display_name || "Dirección no encontrada";
      setSelectedAddress(address);
    } catch (error) {
      console.error("Error al obtener la dirección:", error);
      setSelectedAddress("Error al obtener dirección");
    }
  };

  useEffect(() => {
    if (visible && mapContainerRef.current && !mapRef.current) {
      mapRef.current = new maplibregl.Map({
        container: mapContainerRef.current,
        style: "https://demotiles.maplibre.org/style.json", // URL del estilo MapLibre
        center: [-77.0428, -12.0464], // Coordenadas iniciales (Lima, Perú)
        zoom: 12,
      });

      mapRef.current.on("click", handleMapClick);
    }

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [visible]);

  const handleSave = () => {
    if (selectedCoordinates && selectedAddress) {
      onSelect(selectedAddress, selectedCoordinates);
    }
    onClose();
  };

  return (
    <Modal
      title="Seleccionar Dirección"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancelar
        </Button>,
        <Button
          key="save"
          type="primary"
          onClick={handleSave}
          disabled={!selectedCoordinates}
        >
          Guardar
        </Button>,
      ]}
    >
      <div
        ref={mapContainerRef}
        style={{ width: "100%", height: "400px" }}
        className="map-container"
      />
      <p>{selectedAddress || "Haz clic en el mapa para seleccionar una dirección"}</p>
    </Modal>
  );
};

export default MapsModal;