import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebaseConfig";
import { CarouselImage } from "../../model/CarouselImage";
import { Categories } from "../../model/Categories";
import { Store } from "../../model/Store";
import { Product } from "../../model/Product";
import { getAuth, signOut } from "firebase/auth";
import { clearUser } from "../../../store/authSlice";
import { Dispatch } from "react";
import { clearUids } from "../../../store/businessSlice";

export const getUserRole = async (userId: string): Promise<string> => {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData.role || "";
    }
  } catch (error) {
    console.error("Error fetching user role from Firestore:", error);
  }
  return "";
};

export const handleUserLogout = async (dispatch: Dispatch<any>): Promise<void> => {
  const auth = getAuth();
  try {
    await signOut(auth);
    dispatch(clearUser());
    dispatch(clearUids());
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};

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

export const fetchCategories = async (): Promise<Categories[]> => {
  try {
    const categoriesCollection = collection(db, "categoriesHome");
    const categoriesSnapshot = await getDocs(categoriesCollection);
    const categoriesList = categoriesSnapshot.docs.map((doc) => doc.data() as Categories);
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

export const fetchBestSellers = async (): Promise<Product[]> => {
  try {
    const productsCollection = collection(db, "products");
    const productsSnapshot = await getDocs(productsCollection);
    return productsSnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() as Product }))
      .filter(product => product.bestSelling === true);
  } catch (error) {
    console.error("Error fetching best sellers: ", error);
    return [];
  }
};

export const fetchVirals = async (): Promise<Product[]> => {
  try {
    const productsCollection = collection(db, "products");
    const productsSnapshot = await getDocs(productsCollection);
    return productsSnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() as Product }))
      .filter(product => product.isViral === true);
  } catch (error) {
    console.error("Error fetching virals products: ", error);
    return [];
  }
};