import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Configuración de Firebase (copia tu configuración original aquí)
const firebaseConfig = {
  apiKey: "AIzaSyABR_9YKrExmjYx68gTOelopgE9vcHxggg",
  authDomain: "marketplace-76100.firebaseapp.com",
  projectId: "marketplace-76100",
  storageBucket: "marketplace-76100.appspot.com",
  messagingSenderId: "321375120819",
  appId: "1:321375120819:web:82c846f7a58d555cecefc6",
  measurementId: "G-Q9XC65762M"
};

// Inicializa la app de Firebase
const app = initializeApp(firebaseConfig);

// Exporta la instancia de autenticación
export const auth = getAuth(app);

// (Opcional) Exporta la instancia de analytics si la necesitas
const analytics = getAnalytics(app);
