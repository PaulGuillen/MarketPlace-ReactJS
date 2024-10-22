
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebaseConfig";
import { CarouselImage } from "../model/CarouselImage";

export const fetchCarouselImages = async (): Promise<CarouselImage[]> => {
    try {
      const imagesCollection = collection(db, "carouselImages");
      const imagesSnapshot = await getDocs(imagesCollection);
      const imagesList = imagesSnapshot.docs.map((doc) => doc.data() as CarouselImage); // Aplica el tipo
      return imagesList;
    } catch (error) {
      console.error("Error fetching images: ", error);
      return [];
    }
  };