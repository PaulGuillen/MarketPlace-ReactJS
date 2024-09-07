import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyABR_9YKrExmjYx68gTOelopgE9vcHxggg",
  authDomain: "marketplace-76100.firebaseapp.com",
  projectId: "marketplace-76100",
  storageBucket: "marketplace-76100.appspot.com",
  messagingSenderId: "321375120819",
  appId: "1:321375120819:web:82c846f7a58d555cecefc6",
  measurementId: "G-Q9XC65762M"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);