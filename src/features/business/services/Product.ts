// Product.ts
import { db } from "../../../config/firebaseConfig";
import { collection, addDoc, doc, updateDoc, getDocs, query, where } from "firebase/firestore";

export const fetchCategoriesByUser = async (userUid: string) => {
  const q = query(collection(db, "categoriesProduct"), where("userUid", "==", userUid));
  const querySnapshot = await getDocs(q);
  const categoriesData = querySnapshot.docs.map((doc) => ({
    categoryUid: doc.id,
    ...doc.data(),
  })) as { categoryUid: string; name: string; type: string }[];
  
  return categoriesData;
};

export const addCategory = async (newCategoryName: string, newCategoryType: string, userUid: string, businessUid: string) => {
  const docRef = await addDoc(collection(db, "categoriesProduct"), {
    name: newCategoryName,
    type: newCategoryType,
    userUid,
    businessUid,
  });

  await updateDoc(doc(db, "categoriesProduct", docRef.id), {
    categoryUid: docRef.id,
  });

  return {
    categoryUid: docRef.id,
    name: newCategoryName,
    type: newCategoryType,
  };
};
