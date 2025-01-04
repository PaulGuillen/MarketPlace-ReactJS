import { useEffect, useState } from "react";
import { fetchStores } from "../../services/HomeService";
import { Store } from "../../../model/Store";

const StoresSection = () => {
  const [stores, setStores] = useState<Store[]>([]);

  useEffect(() => {
    const loadStores = async () => {
      const fetchedStores = await fetchStores();
      setStores(fetchedStores);
    };

    loadStores();
  }, []);

  return (
    <section className="py-10 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Nuestras Tiendas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {stores.map((store, index) => (
            <div
              key={index}
              className="relative bg-blue-100 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer flex items-center px-8 py-10 max-w-lg"
            >
              <div className="flex-1 flex flex-col">
                <h3 className="font-bold text-gray-800 mb-4">
                  {store.businessName}
                </h3>
                <p className="text-blue-600 font-medium hover:underline cursor-pointer mt-8">
                  Comprar ahora
                </p>
              </div>
              <div className="flex-shrink-0 ml-2">
                <img
                  src={store.logoImage}
                  alt={store.businessName}
                  className="w-28 h-28 object-contain rounded-lg"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoresSection;
