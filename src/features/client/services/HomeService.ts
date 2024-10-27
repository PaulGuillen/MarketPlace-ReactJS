
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebaseConfig";
import { CarouselImage } from "../../model/CarouselImage";
import { CategoriesHome } from "../../model/CategoriesHome";
import { Store } from "../../model/Store";


export const fetchCarouselImages = async (): Promise<CarouselImage[]> => {
  try {
    const imagesCollection = collection(db, "carouselImages");
    const imagesSnapshot = await getDocs(imagesCollection);
    const imagesList = imagesSnapshot.docs.map((doc) => doc.data() as CarouselImage);
    return imagesList;
  } catch (error) {
    console.error("Error fetching images: ", error);
    return [];
  }
};

export const fetchCategories = async (): Promise<CategoriesHome[]> => {
  try {
    const categoriesCollection = collection(db, "categoriesHome");
    const categoriesSnapshot = await getDocs(categoriesCollection);
    const categoriesList = categoriesSnapshot.docs.map((doc) => doc.data() as CategoriesHome);
    return categoriesList;
  } catch (error) {
    console.error("Error fetching categories: ", error);
    return [];
  }
}

export const fetchStores = async (): Promise<Store[]> => {
  try {
    const storesCollection = collection(db, "stores");
    const storeSnapshot = await getDocs(storesCollection);
    return storeSnapshot.docs.map(doc => doc.data() as Store);
  }
  catch (error) {
    console.error("Error fetching stores: ", error);
    return [];
  }
};