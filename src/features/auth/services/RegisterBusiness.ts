import { db } from "../../../config/firebaseConfig";
import { doc, getDoc, setDoc, query, where, collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const checkDocumentExist = async (document: string): Promise<string | null> => {
  const q = query(collection(db, "users"), where("document", "==", document));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const userDoc = querySnapshot.docs[0];
    return userDoc.id; 
  }
  return null;
};

export const fetchExistingUserData = async (userUid: string) => {
  const userDoc = await getDoc(doc(db, "users", userUid));
  return userDoc.exists() ? userDoc.data() : null;
};

export const prepareBusinessData = (userUid: string, formData: any) => ({
  uid: userUid,
  ...formData,
});

export const saveBusinessData = async (userUid: string, businessData: Record<string, any>) => {
  await setDoc(doc(db, "users", userUid), businessData);
};

export const getCurrentUser = () => {
  return getAuth().currentUser;
};
