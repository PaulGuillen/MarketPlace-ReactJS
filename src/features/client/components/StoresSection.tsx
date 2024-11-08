import { useEffect, useState } from "react";
import { fetchStores } from "../../client/services/HomeService";
import { Store } from "../../model/Store";
import "../../../styles/StoreSection.css";
import Divider from "../../../components/divider/Divider";

const StoresSection = () => {
  const [stores, setStores] = useState<Store[]>([]);

  useEffect(() => {
    const loadStores = async () => {
      const fetchedStores = await fetchStores();
      setStores(fetchedStores);
      console.log(fetchedStores);
    };

    loadStores();
  }, []);

  /**NEED LOGIC TO VALIDATE IF BUSINES HAVE A BRAND OR NOT? */
  return (
    <div className="store-section">
      <h2 className="store-title">Nuestras Tiendas</h2>
      <p className="store-description">
        Encuentra nuestras tiendas a lo largo de Perú
      </p>
      <div className="store-list">
        {stores.map((store, index) => (
          <div className="store-card" key={index}>
            <div
              className="store-image"
              style={{ backgroundImage: `url(${store.logoImage})` }}
            ></div>
            <Divider height="2px" />
            <h3 className="store-title">{store.businessName}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoresSection;
