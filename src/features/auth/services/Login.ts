import { UserBusiness } from "../../model/UserBusiness";
import { auth, db } from "../../../config/firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import { setInformationBusiness } from "../../../store/businessSlice";
import { setUser } from "../../../store/authSlice";
import { Dispatch } from "react";

export const validateInformationToSave = async (dispatch: Dispatch<any>, userUid: string) => {

    const data = await fetchUserData(userUid);

    if (data.role === "business") {
        dispatch(setInformationBusiness({ userUid: data.uid, businessUid: data.businessUid }));
    }

    dispatch(setUser({ email: data.email, uid: data.uid }));
}

export const fetchUserData = async (userUid: string): Promise<UserBusiness | null> => {
    try {
        const user = auth.currentUser;
        if (user) {
            const userDoc = await getDoc(doc(db, "users", userUid));
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

