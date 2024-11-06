import { db } from "../../../config/firebaseConfig";
import {
  doc,
  getDoc,
  setDoc,
  query,
  where,
  collection,
  getDocs,
} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updatePassword,
  User,
} from "firebase/auth";
import { ROLE_BUSINESS } from "../../../utils/Constants";
import { getDocumentType } from "../../../utils/Utils";

export const checkDocumentExist = async (
  document: string
): Promise<string | null> => {
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
  role: ROLE_BUSINESS,
  documentType: getDocumentType(formData.document),
  ...formData,
});

export const saveBusinessData = async (
  userUid: string,
  businessData: Record<string, any>
) => {
  await setDoc(doc(db, "users", userUid), businessData);
};

export const authenticateUser = async (
  email: string,
  password: string
): Promise<User | null> => {
  const auth = getAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error al autenticar al usuario:", error);
    throw new Error("No se pudo autenticar. Verifica tu contraseña actual.");
  }
};

export const updateUserPassword = async (user: User, newPassword: string) => {
  try {
    await updatePassword(user, newPassword);
    console.log("Contraseña actualizada exitosamente.");
  } catch (error) {
    console.error("Error al actualizar la contraseña:", error);
    throw new Error("No se pudo actualizar la contraseña.");
  }
};

export const registerOrUpdateBusiness = async (
  userUid: string | null,
  formData: any,
  isUpdating: boolean,
  authUser: User | null,
  newPassword?: string
) => {
  const auth = getAuth();

  if (!isUpdating) {
    const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.currentPassword);
    userUid = userCredential.user.uid;
    console.log("Usuario nuevo creado con UID:", userUid);
  }

  const businessData = prepareBusinessData(userUid as string, formData);
  await saveBusinessData(userUid as string, businessData);

  if (isUpdating && newPassword && authUser) {
    await updateUserPassword(authUser, newPassword);
  }
};
