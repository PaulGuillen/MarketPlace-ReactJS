import { auth, db } from "../../../config/firebaseConfig";
import { getDoc, doc, setDoc, collection } from "firebase/firestore";

export const fetchUserData = async () => {
    try {
        const user = auth.currentUser;
        if (user) {
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
                return userDoc.data();
            }
        }
        return null;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
};

export const saveStoreData = async (formData: any) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const storeUid = doc(collection(db, "stores")).id;
        await setDoc(doc(db, "stores", storeUid), {
          ...formData,
          userUid: user.uid,
          storeUid,
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error saving store data:", error);
      throw error;
    }
  };