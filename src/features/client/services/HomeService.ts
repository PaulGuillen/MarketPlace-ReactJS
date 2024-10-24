
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebaseConfig";
import { CarouselImage } from "../../model/CarouselImage";
import { Category } from "../../model/CategoriesHome";

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

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const categoriesCollection = collection(db, "categoriesHome");
    const categoriesSnapshot = await getDocs(categoriesCollection);
    const categoriesList = categoriesSnapshot.docs.map((doc) => doc.data() as Category);
    return categoriesList;
  } catch (error) {
    console.error("Error fetching categories: ", error);
    return [];
  }
}