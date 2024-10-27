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
    <section className="store-list">
      {stores.map((store, index) => (
        <div className="store-card" key={index}>
          <div
            className="store-image"
            style={{ backgroundImage: `url(${store.imageUrl})` }}
          ></div>
          <Divider height="2px" /> 
          <h3 className="store-title">{store.title}</h3>
        </div>
      ))}
    </section>
  );
};

export default StoresSection;
