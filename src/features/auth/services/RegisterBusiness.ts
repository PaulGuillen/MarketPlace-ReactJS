import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebaseConfig";
import { getDocumentType } from "../../../utils/Utils";


export const checkDniExists = async (dni: string) => {
  const businessRef = collection(db, "business");
  const q = query(businessRef, where("dni", "==", dni));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};

export const getUserData = async (userUid: string) => {
  const userDocRef = doc(db, "users", userUid);
  const userDocSnap = await getDoc(userDocRef);
  return userDocSnap.exists() ? userDocSnap.data() : null;
};

export const prepareBusinessData = (userUid: string, formData: any) => {
  return {
    uid: userUid,
    name: formData.name,
    lastName: formData.lastName,
    email: formData.email,
    phone: formData.phone,
    document: formData.document,
    documentType: getDocumentType(formData.document),
    businessName: formData.businessName,
    representative: formData.representative,
  };
};

export const registerBusinessData = async (userUid: string, businessData: Record<string, any>) => {
  await setDoc(doc(db, "business", userUid), businessData);
};

export const getCurrentUser = () => {
  const auth = getAuth();
  return auth.currentUser;
};
