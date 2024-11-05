import { getAuth } from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../config/firebaseConfig";

export const checkDniExists = async (dni: string) => {
  const businessRef = collection(db, "business");
  const q = query(businessRef, where("dni", "==", dni));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};

export const registerBusinessData = async (
  userUid: string,
  businessData: Record<string, any>
) => {
  await setDoc(doc(db, "business", userUid), businessData);
};

export const getUserData = async (userUid: string) => {
  const userDocRef = doc(db, "users", userUid);
  const userDocSnap = await getDoc(userDocRef);
  return userDocSnap.exists() ? userDocSnap.data() : null;
};

export const getCurrentUser = () => {
  const auth = getAuth();
  return auth.currentUser;
};
