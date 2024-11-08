import { Store } from "../../../features/model/Store";
import { auth, db } from "../../../config/firebaseConfig";
import { getDoc, doc, setDoc, collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { UserBusiness } from "../../../features/model/UserBusiness";

export const fetchUserData = async (): Promise<UserBusiness | null> => {
    try {
        const user = auth.currentUser;
        if (user) {
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
                return userDoc.data() as UserBusiness;
            }
        }
        return null;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
};

export const fetchStoreData = async (): Promise<Store[]> => {
    try {
        const user = auth.currentUser;
        if (user) {
            const q = query(collection(db, "stores"), where("userUid", "==", user.uid));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const storeData: Store[] = querySnapshot.docs.map(doc => ({
                    ...doc.data(),
                    storeUid: doc.id
                })) as Store[];

                return storeData;
            }
        }
        return [];
    } catch (error) {
        console.error("Error fetching store data:", error);
        throw error;
    }
};

export const saveStoreData = async (formData: any) => {
    try {
        const user = auth.currentUser;
        if (user) {
            const storeDocRef = doc(db, "stores", user.uid);

            const storeDoc = await getDoc(storeDocRef);
            if (storeDoc.exists()) {

                await updateDoc(storeDocRef, {
                    ...formData,
                });
            } else {
                await setDoc(storeDocRef, {
                    ...formData,
                    userUid: user.uid,
                });
            }
            return true;
        }
        return false;
    } catch (error) {
        console.error("Error saving store data:", error);
        throw error;
    }
};